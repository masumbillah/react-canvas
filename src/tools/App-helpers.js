const AppHelpers = {};

AppHelpers.setCollectionData = (result)=> {
   return localStorage.setItem('canvasItems', JSON.stringify(result));
};

AppHelpers.getCollectionData = ()=> {
   return JSON.parse(localStorage.getItem("canvasItems")) || [];
};

AppHelpers.randomId = ()=> {
   return  Math.random().toString(36).substring(5);
};

AppHelpers.getCopyStyles = ()=> {
   return  `<style type="text/css"> .flex-container > .media-panel{margin:0;flex-basis:300px;min-width:200px;height:calc(100vh);background-color:#fff}.flex-container > .canvas{margin:10px;flex:1 1 auto;text-align:center;line-height:75px}.canvas .canvas-page-box{background:#fff;height:calc(100vh - 115px);padding:20px}.canvas .canvas-area{display:flex;flex-wrap:wrap}.canvas .empty{display:flex;flex-direction:column;justify-content:center}.canvas .empty .empty-box{border:dotted 2px #e2e2e2;padding:30px 60px;line-height:2;border-radius:5px;color:#696969;margin:0 auto}.canvas .media-item{border-radius:3px;cursor:move;background-size:cover;background-repeat:no-repeat;height:200px;width:250px}.canvas .media-item-box{position:relative;margin:10px}.canvas .media-item-box:hover{opacity:.95}.icon{display:none} </style>`
};

export default AppHelpers;