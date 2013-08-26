Azure 123
===============

Integrate with hadoop engine
---------------
1. sudo su hdfs
2. cd ~
3. wget http://moviedb.azurewebsites.net/db/ratings.dat
4. wget http://moviedb.azurewebsites.net/db/users.dat
6. awk -F"::" '{print $1","$2","$3}' ml-1m/ratings.dat > ratings.csv
7. awk -F"::" '{print $1","$2","$3}' ratings.dat >> ratings.csv
8. awk -F"::" '{print $1}' users.dat > user-ids.txt
9. ............ start hadoop service if it was not...........
10. hadoop fs -mkdir .
11. hadoop fs -put user-ids.txt ratings.csv .
12. ........... run mahout ..................................
13. hadoop fs -cat item-rec-output/part* > recommendation.part
15. curl -i -F file=@ratings.dat http://moviedb.azurewebsites.net/db/ratings.dat
16. curl -i -F file=@users.dat http://moviedb.azurewebsites.net/db/users.dat
17. curl -i -F file=@recommendation.dat http://moviedb.azurewebsites.net/db/recommendation.dat 


