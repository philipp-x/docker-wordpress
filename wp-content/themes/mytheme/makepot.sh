#!/bin/bash
file=languages/mytheme.pot

if [ ! -e "$file" ] ; then
    touch "$file"
fi

if [ ! -w "$file" ] ; then
    echo Cannot write to $file
    exit 1
fi

find . -iname "*.php" | xargs xgettext -d mytheme -o $file -k__ -k_e -k_n -k_x -k_ex -k_nx -kesc_attr__ -kesc_attr_e -kesc_attr_x -kesc_html__ -kesc_html_e -kesc_html_x -k_n_noop -k_nx_noop --from-code=utf-8 -L PHP
if compgen -G "languages/*.po" > /dev/null ; then
    msgmerge -U languages/*.po $file --backup=off
fi