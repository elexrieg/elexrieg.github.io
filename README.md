# Elexrieg Website

- This website is to host event details conducted in Elexrieg symposium hosted by ECE and EEE deparments from MNM Jain Engineering College.
- Hosted by GitHub Pages.

# Documentation

Since this event is conducted by both EEE and ECE departments, the future batches (passing out 2027) can use this to understand the framework in order to edit or create a new design.

- Uses [Jekyll](https://jekyllrb.com/), which is a [Ruby](https://www.ruby-lang.org/en/) framework. 
- Jekyll allows easy generation of static web-pages as we don't have to write "proper" `html` and `css` for this.
- All we need to do is write base code in `html` and `css` (ironic) and the rest in `.md` which is Markdown.

## Hosting

- Due to dependency issues with GitHub Pages, the hosting is done on Vercel.
- Currently, the website is being hosted by [@bsod2528](github.com/bsod2528)'s vercel account.
- To host it next time or to update the repo! You must please host it from you're personal vercel account as after 2025's event, this website will be taken down. Code will be present.
- In order to make changes to the live website, just keep updating this repo!

---

## To Understand Jekyll
There are no tutorials out there to understand this. So read from the actual Jekyll documentation. It's pretty straight forward.

### To lazy didn't read docs
- `_includes`: directory where all include html files are there. You can call them in ur `.md` files usign [liquid](https://jekyllrb.com/docs/liquid/). This makes life easier. [How I used this](https://github.com/elexrieg/elexrieg.github.io/blob/jekyll/pages/technical.md)
- `_sass`: similar to `_includes` but has all the scss stored. We're not using CSS, its SCSS. Yes errors will come like warnings, don't worry about them (unless they break the website).
- `_layouts`: again, similar to above two, yet this is how the web-page must be by default. You can have multiple layouts upon need.
- `_config.yml`: literally the config file for how jekyll must work in this.
- `_data`: directory to store contents for navigation and more. 

NOTE: Do not delete - [Gemfile, Gemfile.lock, _config.yml, 404.md] as it'll break the working.

### What else is possible?
Well I'm not going to be explaining how Jekyll works, cause it's too big for a single readme file. You can create:
- blog posts
- categorise certain webpages using [collections](https://jekyllrb.com/docs/collections/), which is again a Jekyll feature.

# Jekyll Constraints
- Since it's all hosted on GitHub Organisations under the FREE TIER. It's impossible to make proper API calls as everything like `environment variables` would be open to the public.
- If we `.gitignore` them, even while publishing the website, those variables would be ignored causing much trouble. 
- So ensure everything done here is static. Use alternatives like Google forms or etc. to collect information.
- You can either switch hosts to netlify or other services which offer free environmental variable protection if needed. 

# What Now?
Well this is a template website which is live as it's hosted by GitHub pages. Editing this for future symposiums or creating new websites based on this would be easy for other events and more!
All one needs to know is how Jekyll works. Takes about 2 days maximum if you read and make a test website or just understand the code for this. This ain't C or Assembly.
