#!/usr/bin/env bash
set -x

ffmpeg -i "../Conception/Title Screen video.mp4" -vf scale=1250:-2 -an -threads 12 videos/temp.mp4
ffmpeg -i videos/temp.mp4 -vf crop=1250:525:0:64 -threads 12 videos/lost-amber.mp4
rm videos/temp.mp4
ffmpeg -i videos/lost-amber.mp4 -vf scale=624:-2 -an -threads 12 videos/lost-amber.mobile.mp4
ffmpeg -i videos/lost-amber.mp4 -c:v libvpx -b:v 1M -an -threads 12 videos/lost-amber.webm