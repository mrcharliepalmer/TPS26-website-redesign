#!/bin/bash
# Download advisory panel headshots from The Podcast Show CDN
# Run from the advisory-panel/ folder:  bash download-headshots.sh

CDN="https://cdn.asp.events/CLIENT_AV_Media_E63B4142_BA46_1D2B_9F2E146485599B42/sites/podcast-show-2026/media"

echo "Downloading advisory panel headshots..."

curl -L -o "james-cridland.jpg"       "$CDN/James-Cridland-Headshot.jpg"
curl -L -o "ruth-fitzsimons.jpg"      "$CDN/Ruth-Fitzsimons-Head-Shot-.jpg"
curl -L -o "shaun-wilson.jpg"         "$CDN/Shaun-Wilson-Headshot.jpeg"
curl -L -o "carrie-lieberman.jpg"     "$CDN/Carrie-Lieberman-headshot.jpeg"
curl -L -o "bernard-achampong.jpg"    "$CDN/Bernard-Achampong-Headshot.jpeg"
curl -L -o "arielle-nissenblatt.png"  "$CDN/Arielle-Nissenblatt-Headshot-2026.png"
curl -L -o "megan-bradshaw.jpg"       "$CDN/Megan-Bradshaw-Headshot-2026-1-.jpeg"
curl -L -o "arif-noorani.jpg"         "$CDN/Arif-Noorani-Headshot.jpg"
curl -L -o "steve-ackerman.jpg"       "$CDN/Steve-Ackerman-Headshot.jpg"
curl -L -o "laura-hagen.jpg"         "$CDN/libraries/speakers/LH-Photo-.jpeg"
curl -L -o "vicky-etchells.jpg"      "$CDN/libraries/speakers/Vicky-Etchells-Headshot-1-.jpg"

echo ""
echo "Done. Downloaded $(ls -1 *.jpg *.png 2>/dev/null | wc -l) images."
ls -lh *.jpg *.png 2>/dev/null
