# pagebuilder-vuestorefront

![alt text](https://tapita.io/wp-content/uploads/2021/05/templates.png)

PageBuilder client side module for vuestorefrotn

## To check it
 Flow this gudie to install the new VUE project https://docs.vuestorefront.io/v2/general/installation.html
```
Install the libs and start project:

0. Go to VUE project folder
```
cd '.../VUE_project'
```
1. Install vuera to use ReactJs in Vue
```
yarn add vuera
```
2. Install Tapita tool 
```
npm install --save simi-pagebuilder-react
```
3. Install React
```
npm install --save react react-dom
```
4. Install again to avoid the conflicts
```
yarn install
```

## Over-ride files

1. At VUE project folder 
2. Git clone https://github.com/TapitaCommerce/spb_vue.git builder_pages
```
Git clone https://github.com/TapitaCommerce/spb_vue.git builder_pages
```
3. Override pages 
```
cp -Rf ./builder_pages/pages ./pages
```
4. Run to build 
```
  yarn dev
```
