#!/usr/bin/env bash


echo "Starting REPL session with testbot..."
script_path=$(dirname $0)
script_path=$(cd $script_path && pwd)
node $script_path/console.js
