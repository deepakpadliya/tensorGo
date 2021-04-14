# TensorGo Assignment

# MicroServices to fetch the API and store the data in the Database
### Fetch data from external API http://localhost:2222/fetch/user
![](images/s1.png)

# Publish the User data to the frontend and update the data in the table

## UI ScreenShorts
* List of Users
![](images/s2.png)

* ADD Edit User
![](images/s3.png)

## API References

### Fetch Users http://localhost:4444/users
    Method GET
![](images/s4.png)

### Update User http://localhost:4444/user/6076e489b01cbbcd0d63e335
    Method PUT
    BODY
    {
        "name":"Ranjeet",
        "email":"vyctorhugoc@gmail.com.br",
        "gender":"Male"
    }

![](images/s7.png)

### Delete User http://localhost:4444/user/6076e489b01cbbcd0d63e335
    Method DELETE
    Params{
        id:6076e489b01cbbcd0d63e335
    }
![](images/s8.png)


## Microservice to export the data into CSV

### http://localhost:3333/user/csv
    Method GET
![](images/s6.png)
