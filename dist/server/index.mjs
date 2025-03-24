const bootstrap = async ({ strapi: strapi2 }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Access the plugin settings",
      uid: "settings.read",
      pluginName: "tinymce"
    },
    {
      section: "plugins",
      displayName: "Menu link to plugin settings",
      uid: "menu-link",
      pluginName: "tinymce"
    }
  ];
  await strapi2.admin.services.permission.actionProvider.registerMany(actions);
};
const destroy = ({ strapi: strapi2 }) => {
};
const name = "@sklinet/strapi-plugin-tinymce";
const version = "1.1.6";
const description = "Strapi custom field with a customized build of TinyMCE richtext editor.";
const keywords = [
  "strapi",
  "tiinymce",
  "tinymce 7",
  "wysiwyg",
  "rich text",
  "editor"
];
const license = "MIT";
const author = {
  name: "SKLINET s.r.o.",
  url: "https://github.com/SKLINET"
};
const type = "commonjs";
const exports = {
  "./package.json": "./package.json",
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  }
};
const files = [
  "dist"
];
const scripts = {
  build: "strapi-plugin build",
  "test:ts:back": "run -T tsc -p server/tsconfig.json",
  "test:ts:front": "run -T tsc -p admin/tsconfig.json",
  verify: "strapi-plugin verify",
  watch: "strapi-plugin watch",
  "watch:link": "strapi-plugin watch:link"
};
const dependencies = {
  "@strapi/design-system": "^2.0.0-rc.11",
  "@strapi/icons": "^2.0.0-rc.11",
  "@tinymce/tinymce-react": "^5.1.1",
  "react-intl": "^6.8.4",
  "tinymce-i18n": "^24.10.28"
};
const devDependencies = {
  "@strapi/sdk-plugin": "^5.2.7",
  "@strapi/strapi": "^5.1.1",
  "@strapi/typescript-utils": "5.1.1",
  "@types/react": "^18.3.10",
  "@types/react-dom": "^18.3.0",
  prettier: "^3.3.3",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "styled-components": "^6.1.13",
  typescript: "^5.6.2"
};
const peerDependencies = {
  "@strapi/sdk-plugin": "^5.2.7",
  "@strapi/strapi": "^5.1.1",
  react: "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "styled-components": "^6.1.13"
};
const strapi$1 = {
  displayName: "TinyMCE",
  name: "tinymce",
  description: "Strapi custom field with a customized build of TinyMCE richtext editor.",
  kind: "plugin"
};
const maintainers = [
  {
    name: "SKLINET s.r.o.",
    url: "https://github.com/SKLINET"
  }
];
const repository = {
  type: "git",
  url: "https://github.com/SKLINET/strapi-plugin-tinymce"
};
const pluginPkg = {
  name,
  version,
  description,
  keywords,
  license,
  author,
  type,
  exports,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  strapi: strapi$1,
  maintainers,
  repository
};
const PLUGIN_ID = pluginPkg.name.replace(/^(@sklinet\/strapi-)plugin-/i, "");
const register = ({ strapi: strapi2 }) => {
  strapi2.customFields.register({
    name: "tinymce",
    plugin: PLUGIN_ID,
    type: "richtext"
  });
};
const config$3 = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const config$2 = {
  getConfig: async (ctx) => {
    const { configKey } = ctx.params;
    const config2 = await strapi.plugin("tinymce").service("config").getConfig(configKey);
    ctx.send(config2);
  }
};
const settings$2 = {
  getSettings: async (ctx) => {
    try {
      ctx.body = await strapi.plugin("tinymce").service("settings").getSettings();
    } catch (err) {
      ctx.body = err;
      ctx.throw(500, err);
    }
  },
  setSettings: async (ctx) => {
    const { body } = ctx.request;
    try {
      await strapi.plugin("tinymce").service("settings").setSettings(body);
      ctx.body = await strapi.plugin("tinymce").service("settings").getSettings();
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};
const controllers = {
  config: config$2,
  settings: settings$2
};
const middlewares = {};
const policies = {};
const config$1 = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/config/:configKey",
      handler: "config.getConfig",
      config: { policies: [] }
    }
  ]
};
const settings$1 = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/settings",
      handler: "settings.getSettings",
      config: {
        policies: [],
        auth: false
      }
    },
    {
      method: "POST",
      path: "/settings",
      handler: "settings.setSettings",
      config: {
        policies: [],
        auth: false
      }
    }
  ]
};
const routes = {
  config: config$1,
  settings: settings$1
};
const config = ({ strapi: strapi2 }) => {
  return {
    getConfig(key = "editor") {
      return strapi2.plugin("tinymce").config(key) ?? {};
    }
  };
};
function getPluginStore() {
  return strapi.store({
    environment: "",
    type: "plugin",
    name: "tinymce"
  });
}
async function createDefaultConfig() {
  const pluginStore = getPluginStore();
  const value = {
    apiKey: ""
  };
  await pluginStore.set({ key: "settings", value });
  return pluginStore.get({ key: "settings" });
}
const settings = () => {
  return {
    async getSettings() {
      const pluginStore = getPluginStore();
      let config2 = await pluginStore.get({ key: "settings" });
      if (!config2) {
        config2 = await createDefaultConfig();
      }
      return config2;
    },
    async setSettings(settings2) {
      const value = settings2;
      const pluginStore = getPluginStore();
      await pluginStore.set({ key: "settings", value });
      return pluginStore.get({ key: "settings" });
    }
  };
};
const services = {
  config,
  settings
};
const index = {
  register,
  bootstrap,
  destroy,
  config: config$3,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
