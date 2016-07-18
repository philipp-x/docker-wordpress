#!/bin/bash
path=./languages/*.po

for file in `find . -path "$path"` ; do
    msgfmt -o ${file/.po/.mo} $file ;
done