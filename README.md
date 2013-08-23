Hello-NodeJS
============

----------------
Install Node.JS
----------------
1. wget http://mirror01.idc.hinet.net/EPEL/6/i386/epel-release-6-8.noarch.rpm
2. sudo rpm -i epel-release-6-8.noarch.rpm
3. sudo yum install npm --disableexcludes=all

----------------
Install & Run project
----------------
1. git clone https://github.com/rainbean/Hello-NodeJS.git local-folder-name
2. cd local-folder-name
3. npm install
4. sudo node app

----------------
ToDo
----------------
1. Present color of rating and recommendation 
2. Add back rating system
3. Movie linkage with IMDB

----------------
Future Works
----------------
1. Tightly integrate with hadoop engine

----------------
Q&A
----------------
Q. Invalid characters in movies name? 
A. Convert movies.dat to UTF-8 format.  $ iconv -f iso-8859-1 -t utf-8 movies-src.dat > movies.dat

