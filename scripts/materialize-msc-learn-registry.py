#!/usr/bin/env python3
"""Materialize the final MSC Learn registry files from the temporary payload.

Usage:
    python scripts/materialize-msc-learn-registry.py
    python scripts/materialize-msc-learn-registry.py --clean

The --clean option removes the temporary payload, the branch-only workflow,
and this bootstrap script after all three output hashes are verified.
"""

from __future__ import annotations

import argparse
import base64
import bz2
import gzip
import hashlib
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
PAYLOAD = ROOT / ".github" / "msc-learn-payload"

OUTPUTS = (
    (
        "json",
        ROOT / "docs" / "learn" / "MSC_Learn_Master_Registry.json",
        "gzip",
        "c5ca644d9f4f4fda3a887cfb1106b1d6472f190509cb7865c627b34ff6dde531",
    ),
    (
        "md",
        ROOT / "docs" / "learn" / "MSC_Learn_Master_Registry.md",
        "bz2",
        "84049ef0414ab84d89e8e5f9e3489436007d61e7d23fd691152af54ea5f55162",
    ),
    (
        "validation",
        ROOT / "docs" / "learn" / "MSC_Learn_Registry_Validation.txt",
        "gzip",
        "de9ec5ef6f4d98a7bc209a690ea8ec64ac4e3c940d31b187cee86c3f059ccd4c",
    ),
)


def decode_payload(folder: str, compression: str) -> bytes:
    parts = sorted((PAYLOAD / folder).glob("part-*"))
    if not parts:
        raise RuntimeError(f"No payload chunks found for {folder}")

    encoded = "".join(part.read_text(encoding="ascii").strip() for part in parts)
    packed = base64.b64decode(encoded, validate=True)

    if compression == "gzip":
        return gzip.decompress(packed)
    if compression == "bz2":
        return bz2.decompress(packed)
    raise RuntimeError(f"Unsupported compression: {compression}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Remove the temporary payload and bootstrap files after success.",
    )
    args = parser.parse_args()

    for folder, destination, compression, expected_sha in OUTPUTS:
        raw = decode_payload(folder, compression)
        actual_sha = hashlib.sha256(raw).hexdigest()
        if actual_sha != expected_sha:
            raise RuntimeError(
                f"SHA mismatch for {destination}: expected {expected_sha}, got {actual_sha}"
            )

        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(raw)
        print(f"Wrote {destination.relative_to(ROOT)} ({len(raw)} bytes)")

    print("All final MSC Learn registry files materialized and verified.")

    if args.clean:
        shutil.rmtree(PAYLOAD)
        branch_workflow = ROOT / ".github" / "workflows" / "materialize-msc-learn-registry.yml"
        branch_workflow.unlink(missing_ok=True)
        Path(__file__).unlink(missing_ok=True)
        print("Removed temporary payload and bootstrap files.")


if __name__ == "__main__":
    main()
