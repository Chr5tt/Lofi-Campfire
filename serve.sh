#!/bin/sh
# Jalankan server lokal agar player YouTube berfungsi (butuh alamat http, bukan file://)
cd "$(dirname "$0")"
echo "Buka http://localhost:8000"
python3 -m http.server 8000
