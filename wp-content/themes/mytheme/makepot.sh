#!/bin/bash
file=languages/mytheme.pot

if [ ! -e "$file" ] ; then
    touch "$file"
fi

if [ ! -w "$file" ] ; then
    echo Cannot write to $file
    exit 1
fi

find . -iname "*.php" | xargs xgettext -d mytheme -j -o $file -k__ -k_e -k_x --from-code=utf-8 -L PHP