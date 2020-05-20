# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

require 'sprockets/es6'
activate :sprockets do |s|
  s.supported_output_extensions << '.js'
end
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
ignore 'dev/*'
ignore 'dev'


activate :directory_indexes
set :css_dir, 'stylesheets'
configure :development do
  
  activate :external_pipeline,
    name: :gulp,
    command: "gulp",
    source: ".tmp",
    latency: 0
  activate :minify_css
end

configure :build do
  activate :external_pipeline,
    name: :gulp,
    command: "gulp build --prod",
    source: ".tmp",
    latency: 1
  activate :minify_css
  activate :gzip
end


helpers do
    def is_active(c,p)
      if c == p
        return "active"
      else
        return ""
      end
    end
end