const images = document.querySelectorAll('.js-lazy-image');

const config = {
    rootMargin: '50px 0px',
    threshoad: 0.01
}

let imageCout = images.length;

let observer;

// 浏览器兼容处理

if(!('IntersectionObserver' in window)){
    //如有不支持Observer属性的，立即加载图片
    loadImagesImmediately(images); 
}else{
    observer = new IntersectionObserver(onInterSection,config);

    for(let i = 0;i < images.length;i++){

        let image = images[i];

        if (image.classList.contains('js-lazy-image--handled')) {
            continue;
        }

        observer.observe(image);
    }
}
/**
 * On intersection
 * @param {array} entries
 */

function onInterSection(entries) {
    if(imageCout === 0){
        observer.disconnect();
    }

    for(let i = 0; i < entries.length; i++){
        let entry = entries[i];
        if (entry.intersectionRatio > 0){
            imageCout--;
            observer.unobserve(entry.target);
            preloadImage(entry.target)
        }       
    }
}
/**
 * Fetchs the image for the given URL
 * @param {string} url
 */

 function fetchImage(url){
    return new Promise((resolve,reject) =>{
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
    })
 }

/**
 * Preloads the image
 * @param {object} image
 */

function preloadImage(image){
    const src = image.dataset.src;
    if(!src){
        return;
    }
    return fetchImage(src).then(() => {
        applyImage(image,src) 
    })
}

/**
 * Load all of the images immediately
 * @param {NodeListOf<Element>} images
 */

function loadImagesImmediately(images){
    for(let i = 0;i < images.length;i++){
        let image = images[i];
        preloadImage(image);
    }
}

function disconnect(){
    if(!observer){
        return;
    }
    observer.disconnect();
}



/**
 * Apply the image
 * @param {object} img
 * @param {string} src
 */

function applyImage(img,src){
    img.classList.add('js-lazy-image--handled');
    img.src = src;
    img.classList.add('fade-in');
}