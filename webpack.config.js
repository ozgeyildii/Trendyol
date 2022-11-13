const path = require("path");
// MiniCssExtractPlugin is a plugin that extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// HtmlWebpackPlugin is a plugin that simplifies creation of HTML files to serve your webpack bundles.
const HtmlWebpackPlugin = require("html-webpack-plugin");
// CleanWebpackPlugin is a plugin that removes/cleans build folders and unused assets when rebuilding.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// multipage website
// Pages array for HtmlWebpackPlugin
const pages = ["index"];

// Webpack configuration
module.exports = {
  // Define dynamically an entry for each page
  // -------------------------------
  // entry: pages.reduce((config, page) => {
  //   config[page] = `./src/js/${page}.js`;
  //   return config;
  // }, {}),
  entry: "./src/index.js",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    assetModuleFilename: "assets/[name][ext]",
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    // Clean dist folder
    new CleanWebpackPlugin(),
    // Extract css into files
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Login",
      filename: "login.html", //output
      template: "./src/views/login.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Register",
      filename: "register.html", //output
      template: "./src/views/register.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Payment",
      filename: "payment.html", //output
      template: "./src/views/payment.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Kadin",
      filename: "kadin.html", //output
      template: "./src/views/kadin.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Erkek",
      filename: "erkek.html", //output
      template: "./src/views/erkek.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Ev-Mobilya",
      filename: "ev-mobilya.html", //output
      template: "./src/views/ev-mobilya.html", //input
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      title: "Anne-Cocuk",
      filename: "anne-cocuk.html", //output
      template: "./src/views/anne-cocuk.html", //input
    }),
  ].concat(
    // Generate multiple html pages
    // For each page name in `pages` array, create a new HtmlWebpackPlugin
    // that uses the corresponding html template in the `src/views` folder
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: "body",
          title: `${page} Page`,
          filename: page === "index" ? "index.html" : `${page}/index.html`,
          template: `./src/views/${page}.html`,
        })
    )
  ),

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Mute the deprecation warning
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif|jfif)$/i,
        // Webpack 5 asset modules
        type: "asset/resource",
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    open: true,
    compress: true,
    liveReload: true,
    hot: true,
    port: 9000,
  },
};
