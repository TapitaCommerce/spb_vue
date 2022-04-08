# pagebuilder-vuestorefront

![alt text](https://tapita.io/wp-content/uploads/2021/05/templates.png)

PageBuilder client side module for storefront

## To check it

Flow this guide to install the new VUE project https://docs.vuestorefront.io/v2/general/installation.html

Install the libs and start project:

0. Go to VUE your project folder

1. Install vuera to use ReactJs in Vue

```
yarn add vuera
```

2. Install Tapita tool

```
yarn add --save simi-pagebuilder-react
```

3. Install React

```
yarn add --save react react-dom
```

4. Install again to avoid the conflicts

```
yarn install
```

## Override files

1. At VUE project folder
2. Git clone https://github.com/TapitaCommerce/spb_vue.git builder_pages

```
git clone https://github.com/TapitaCommerce/spb_vue.git builder_pages
```

3. Override pages

At root folder

```
cp -a ./builder_pages/ ./
```

4. Update your key

```
  Copy Integration Token at tapita.io and replace it at the files ./pages/PageBuilderWrapper.js and ./pages/RegularPage.js
```

5. Initialize env variable

* Copy `.env` from `.env.sample`
* Fill in urls

6. Run to build

```
  yarn dev
```
