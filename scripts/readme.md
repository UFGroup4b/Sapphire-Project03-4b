# Dump Files
Dump files are used by docker to recreate the database from scratch. They, and the script that uses them, are located in ``/scripts/``. The dump file that controls the content of strapi is **development_db.dump**.

## Creating Dump Files
Creating dump files is down using postgres. When running in the Docker environment, you can open the database in a terminal like so:
![image](https://github.com/DavidMagda/CaSMM_fork_2023/assets/31215899/30472760-1f70-4007-9017-02ce31b9d8ce)

Once in the terminal, you can use the ```pg_dump``` command to create the dump file. The full syntax for this is: ```pg_dump -U postgres strapi -f development_db.dump```. This creates the dump file in the current directory. You can then find it in one of two ways: through the Docker UI or through your file navigation system.

### Finding the file through the Docker UI
You can find the file in the 'Files' tab for the database. It's located here:
![image](https://github.com/DavidMagda/CaSMM_fork_2023/assets/31215899/31321e15-aa5d-4196-8398-79afb64bbf7a)

It will be located in the **docker-entrypoint-initdb.d** folder like so:
![image](https://github.com/DavidMagda/CaSMM_fork_2023/assets/31215899/41f59197-0cdc-4526-8bd2-437b21dae6fc)

You can then right-click and save the file to your desired directory.
![image](https://github.com/DavidMagda/CaSMM_fork_2023/assets/31215899/c7d413f5-f197-48a4-b1ec-8c7eb9a803a8)

Replacing the old dump with this new one will allow you to load your strapi into whatever state it was in when the dump was made.

# Issues
If this does not work, you can alternatively try using the command ```pg_dumpall -U postgres -f dumpall.dump```. This will dump all of the databases and you can then manually remove the ones that you didn't mean to grab.
