#!/usr/bin/env sh

# VERSION 15.04#01
# Fri Feb 13 00:53:30 2015 | 1423806810
# schedules time to run garbage collection on a daily basis

# TO USE:
# change directory to the file with schedule.garbage.collection.sh
# sh schedule.garbage.collection.sh

# USGAGE/HELP MESSAGE
prog=$(basename $0);
help="

${prog} -[h] 

$prog puts a job in cron to execute the garbage collection script on a daily basis.

TO USE:
change directory to the file with schedule.garbage.collection.sh
and enter the command:
sh schedule.garbage.collection.sh                               

	-h displays helpful information about $prog
" ;

# SET UP SIMPLE COMMAND LINE FLAGS
while getopts "h" opt ;
do
    case "$opt" in
        h) echo "$help" ;
            exit 0 ;;
        [?])echo "$0: unknown option" >&2 ; #"unknown option" Usage: $0 [-s] [-d seplist] file ..."
            exit 1 ;;
    esac
    shift $OPTIND-1 ;
done

# NON-TEMPLATE / SCRIPT BEGINS

FILE="/tmp/crontab.$$";
NODE=$(which nodejs);
DIR=$(pwd);
crontab -l > $FILE


#    min hour mday month wday command  
echo " 0 0 * * * $NODE ${DIR}/garbage.collection.js" >> $FILE
# To change the garbage collection time alter the line above.
# If the script has been run before this will only add additional 
# executions. This will not change existing jobs which have been
# previously entered.
# The default value is '0 0 * * *' for 0:00 or midnight every day.
# '*' represents all values or every interval being valid.
# 1st number is minutes, 0-59 and '*' are valid values
# 2nd number is hours, 0-23 and '*' are valid values
# 3rd number is month day 1-31 and '*' are valid values
# 4th number is month 1-12 and '*' are valid values
# 5th number is week day 0-7 and '*' are valid values. Sunday can be represented by '0' or '7'.
# Look up 'cron' for more details

crontab $FILE
rm $FILE
