fis.set('project.ignore',['node_modules/**', 'lib/**','output/**', '.git/**', 'fis-conf.js','angular.min.js','jquery-1.11.1.min.js','jquery.nicescroll.min.js'])
fis.set('project.md5Connector ', '.');
fis.match('*.scss', {
    useHash: true,
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        // options...
    })
})
fis.match('js/*.js', {
    useHash: true,
    // optimizer: fis.plugin('uglify-js'),
    release:'/static/$0'
});
fis.match('**.less',{
    useHash: true,
    parser: fis.plugin('less', {
        //fis-parser-less option
    }),
    rExt: '.css'
});
fis.match('**.{less,css}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
});
fis.match('*.html:css',{
    optimizer:fis.plugin('clean-css')
})
fis.match('**.png', {
    useHash: false
});
