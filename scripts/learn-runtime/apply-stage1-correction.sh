#!/usr/bin/env bash
set -euo pipefail
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
cat scripts/learn-runtime/.stage1-exact-* | base64 --decode > "$work/core.tar.gz"
tar -xzf "$work/core.tar.gz"
cat > "$work/checksums" <<'SUMS'
afd6c431512b16cd0d3f188264e7288b2ea924d17aaf9fa7eacb7798c10db2a9  docs/learn/runtime/schema/msc-learn-runtime-v2.schema.json
3b570ae7a03e4f27e5969b11aef17fc2c0d5e3f126244aecd2416799863e91f8  scripts/learn-runtime/audit.mjs
65586322a52584e2c163f666c7fbc794d28be0ca8008939a1a4ad23315ad436a  scripts/learn-runtime/lib/markdown.mjs
SUMS
sha256sum --check "$work/checksums"
