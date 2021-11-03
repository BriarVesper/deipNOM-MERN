# deipNOM
deipNOM (From the Ancient Greek **δεῖπνον**, or **deîpnon**, meaning "Dinner"/"Evening meal") is a a MERN stack shopping list application.

<div align="center">

![Sample image of deipNOM](https://raw.githubusercontent.com/BriarVesper/deipNOM/main/public/Sample.png)
</div>

#### Features
deipNOM is a simple, one-page app divided into two sections: Recipes and Shopping List.
- The Recipe page allows users to enter custom recipes:
    - Ingredient list, separated by commas or newline
        - Should always be in the format of "{\$number} {\$measurement} of {\$ingredient}" or "{\$number} {\$ingredient}"
    - The list is then displayed, which allows users to edit, delete, or select recipes.
- Selected recipes are then added to the Shopping List page, which will:
    - Combine all like ingredients to display total amount needed for selected recipes
    - Allow the user to remove recipes from the list

Everything is stored in localStorage, so there is an upper limit to how many recipe items can be saved at a time.

#### Running locally
In order to run deipNOM locally, you will require `docker` as well as a Cloudinary account. You also have to create an `.env` file. From the srv directory:

```
$ cp .default.env .env
$ nano .env
Fill in the variables with your Cloudinary credentials
```

After doing that, from the root, run `docker-compose up --build`.