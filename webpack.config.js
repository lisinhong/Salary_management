const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/component/index.jsx'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(scss|sass)$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.(js|jsx)$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react']
				}
			},
			exclude: '/node_modules/'
		}, {
			test: /\.(jpe?g|png|gif|ico)$/i,
			loader: 'file-loader?name=[name].[ext]'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		})
	],
	mode: 'development'
}