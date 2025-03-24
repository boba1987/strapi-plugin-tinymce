"use strict";
const react = require("react");
const jsxRuntime = require("react/jsx-runtime");
const styled = require("styled-components");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const name$1 = "@sklinet/strapi-plugin-tinymce";
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
const exports$1 = {
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
const strapi = {
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
  name: name$1,
  version,
  description,
  keywords,
  license,
  author,
  type,
  exports: exports$1,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  strapi,
  maintainers,
  repository
};
const PLUGIN_ID = pluginPkg.name.replace(/^(@sklinet\/strapi-)plugin-/i, "");
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const prefixPluginTranslations = (trad, pluginId) => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};
const pluginPermissions = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  "menu-link": [{ action: "plugin::tinymce.menu-link", subject: null }],
  settings: [{ action: "plugin::tinymce.settings.read", subject: null }]
};
const IconBox = styled__default.default(designSystem.Flex)`
    background-color: #f0f0ff; /* primary100 */
    border: 1px solid #d9d8ff; /* primary200 */

    svg > path {
        fill: #4945ff; /* primary600 */
    }
`;
const PluginIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(IconBox, { justifyContent: "center", alignItems: "center", width: 7, height: 6, hasRadius: true, "aria-hidden": true, children: /* @__PURE__ */ jsxRuntime.jsx(icons.Paragraph, {}) });
};
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.customFields.register({
      name: "tinymce",
      pluginId: PLUGIN_ID,
      type: "richtext",
      icon: PluginIcon,
      intlLabel: {
        id: getTranslation("settings.title"),
        defaultMessage: "TinyMCE"
      },
      intlDescription: {
        id: getTranslation("settings.description"),
        defaultMessage: "TinyMCE rich text editor"
      },
      isResizable: false,
      default: 12,
      options: {
        advanced: [
          {
            type: "checkbox",
            name: "required",
            intlLabel: {
              id: getTranslation("settings.required-field"),
              defaultMessage: "Required field"
            },
            description: "You won't be able to create an entry if this field is empty"
          }
        ]
      },
      components: {
        Input: async () => Promise.resolve().then(() => require(
          /* webpackChunkName: "video-field-input-component" */
          "./Wysiwyg-BhqJ7p8l.js"
        ))
      }
    });
    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: `${PLUGIN_ID}.plugin.name`,
          defaultMessage: "TinyMCE"
        }
      },
      [
        {
          intlLabel: {
            id: getTranslation("settings.page-title"),
            defaultMessage: "Configuration"
          },
          id: "settings",
          to: `/settings/${PLUGIN_ID}`,
          Component: async () => {
            return Promise.resolve().then(() => require("./Settings-CTYoTXfi.js"));
          },
          permissions: pluginPermissions["settings"]
        }
      ]
    );
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name
    });
  },
  bootstrap(app) {
  },
  async registerTrads(app) {
    const { locales } = app;
    const importedTranslations = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-4ldo0hfI.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-usAdfkfH.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-BcD0BjAU.js")) }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, PLUGIN_ID),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return importedTranslations;
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.getTranslation = getTranslation;
exports.index = index;
//# sourceMappingURL=index-4X1ewlms.js.map
