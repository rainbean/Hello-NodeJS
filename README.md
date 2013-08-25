Hello-NodeJS
============

Install Node.JS (CentOS)
--------------
- wget http://mirror01.idc.hinet.net/EPEL/6/i386/epel-release-6-8.noarch.rpm
- sudo rpm -i epel-release-6-8.noarch.rpm
- sudo yum install npm --disableexcludes=all

Install & Run project
--------------
- git clone https://github.com/rainbean/Hello-NodeJS.git local-folder-name
- cd local-folder-name
- npm install
- sudo node app

ToDo
--------------
- [x] Present color of rating and recommendation 
- [x] Add back rating system
- [x] Add show all/rated toggle button
- [x] Fetch movie detail from IMDB
- [x] Change entry page to index.html
- [x] ~~modify routing table~~

Future Works
--------------
- Tightly integrate with hadoop engine

Q&A
--------------
- **Invalid characters in movies name?** Convert movies.dat to UTF-8 format
```
 $ iconv -f iso-8859-1 -t utf-8 movies-src.dat > movies.dat
```

