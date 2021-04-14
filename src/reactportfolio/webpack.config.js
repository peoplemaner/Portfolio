const { resolve } = require('path')

module.exports = {
    mode: 'development',

    // 엔트리 파일 경로
    entry: './src/index.tsx',

    // 빌드 결과물을 dist/bundle.js에 위치
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },

    //  디버깅을 위해 빌드 결과물에 소스맵 추가
    devtool: "source-map",

    resolve: {
        // 파일 확장자 처리
         extensions: [".ts", ".tsx", "js"]
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                 
                 'css-loader',
                 'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }

}