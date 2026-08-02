#!/usr/bin/env bash
set -euo pipefail
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
cat scripts/learn-runtime/.stage1-patch-* | base64 --decode | gzip --decompress > "$work/correction.patch"
git apply -p1 --whitespace=nowarn "$work/correction.patch"
