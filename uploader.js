define(function(require, exports, module){
    var Upload = function(){};
    Upload.prototype.opts = {
        params: null,
        fileKey: 'upload_file'
    };
    Upload.prototype.init = function(option, callback){
        var that = this, opts = option || {};
        this.imgMaxWidth = opts.imgMaxWidth || 640;
        this.pasteTarget = opts.pasteTarget;
        this.callback = callback;
        opts.pasteTarget && opts.pasteTarget.on('paste', (function(e) {
            that._pasteByClipboardApi.call(that, e);
            return false;
        }))
        opts.inputFile && opts.inputFile.on('change', function(){
            that._convertImgToBase64(opts.inputFile, function(imgSrc){
                callback && typeof(callback) == 'function' && callback(imgSrc);
            })
            return false;
        })
    }
    Upload.prototype.generateId = (function() {
        var id;
        id = 0;
        return function() {
        return id += 1;
        };
    })();

    Upload.prototype.getFile = function(fileObj) {
        var name, ref, ref1;
        if (fileObj instanceof window.File || fileObj instanceof window.Blob) {
            name = (ref = fileObj.fileName) != null ? ref : fileObj.name;
        } else {
            return null;
        }
        return {
            id: this.generateId(),
            url: this.opts.url,
            params: this.opts.params,
            fileKey: this.opts.fileKey,
            name: name,
            size: (ref1 = fileObj.fileSize) != null ? ref1 : fileObj.size,
            ext: name ? name.split('.').pop().toLowerCase() : '',
            obj: fileObj
        };
    };
    Upload.prototype.readImageFile = function(fileObj, callback) {
        var fileReader, img;
        if (!$.isFunction(callback)) {
            return;
        }
        img = new Image();
        img.onload = function() {
            return callback(img);
        };
        img.onerror = function() {
            return callback();
        };
        if (window.FileReader && FileReader.prototype.readAsDataURL && /^image/.test(fileObj.type)) {
            fileReader = new FileReader();
            fileReader.onload = function(e) {
                return img.src = e.target.result;
            };
            return fileReader.readAsDataURL(fileObj);
        } else {
            return callback();
        }
    };
    Upload.prototype._pasteByClipboardApi = function(e){
        var imageFile, pasteItem, that = this, text;
        var pasteTarget = this.pasteTarget;
        if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.items && e.originalEvent.clipboardData.items.length > 0) {
            pasteItem = e.originalEvent.clipboardData.items[0];
            if (/^image\//.test(pasteItem.type)) {
                imageFile = pasteItem.getAsFile();
                if (!imageFile.name) imageFile.name = "Clipboard Image.png";
                this.readImageFile(this.getFile(imageFile).obj, function(img){
                    that.callback && typeof(that.callback) == 'function' && that.callback([img.src]);
                    // pasteTarget && pasteTarget.append('<p class="img"><img src="'+img.src+'"/></p>');
                })
            } else {
                that._pasteText(e);
            }
        } else {
            that._pasteText(e);
        }
    }
    Upload.prototype._pasteText = function(e) {
        try {
            // IE
            text = window.clipboardData.getData('Text');
        } catch (err) {
            // Not IE
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        }
        observer.trigger('insertText', text);
    };
    Upload.prototype._convertImgToBase64 = function($input, callback){
        var files = $input[0].files, fileLength = $input[0].files.length;
        var URL = window.URL || window.webkitURL, imgArr = [];
        var maxWidth = this.imgMaxWidth;
        if(!fileLength) return;
        for(var i = 0; i<fileLength; i++) {
            (function(i){
                var img = new Image(), file = files[i];
                img.src = URL.createObjectURL(file);
                img.onload = function() {
                    var that = this, w, h;
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    //生成比例
                    if(that.width>maxWidth) {
                        w = maxWidth;
                        h = maxWidth*that.height/that.width;
                    } else {
                        w = that.width;
                        h = that.height;
                    }
                    $(canvas).attr({
                        width: w,
                        height: h,
                    });
                    ctx.drawImage(that, 0, 0, w, h);
                    imgArr.push(canvas.toDataURL(file.type, 0.8));
                    if(imgArr.length == fileLength) {
                        callback && typeof(callback) == 'function' && callback(imgArr);
                        $input.val('');
                    }
                };
            })(i);
        }
    }

    module.exports = {
        Upload: Upload
    }
})