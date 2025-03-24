"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const tinymceReact = require("@tinymce/tinymce-react");
const index = require("./index-4X1ewlms.js");
const settings = require("./settings-B3aKnT7M.js");
const admin = require("@strapi/strapi/admin");
const prefixFileUrlWithBackendUrl = (path, defaultDomain = "http://localhost:1337") => {
  if (path?.startsWith("http")) {
    return path;
  }
  const url = process.env.BACKEND_URL;
  if (url) {
    return url + path;
  } else {
    return defaultDomain + path;
  }
};
const TinyEditor = ({ onChange, name, value, disabled }) => {
  const { get } = admin.useFetchClient();
  const [pluginConfig, setPluginConfig] = react.useState(null);
  const [apiKey, setApiKey] = react.useState("");
  const [loading, setLoading] = react.useState(true);
  const uploadUrl = prefixFileUrlWithBackendUrl("/api/upload", pluginConfig?.data?.defaultAdminDomain || "");
  react.useEffect(() => {
    const getApiKey = async () => {
      const data = await settings.taskRequests.getSettings();
      if (data) {
        return setApiKey(data.data.apiKey);
      }
    };
    const getPluginConfig = async () => {
      const editor = await get(`/${index.PLUGIN_ID}/config/editor`);
      if (editor) {
        setPluginConfig(editor);
      }
    };
    getApiKey().then(() => {
      setLoading(false);
    });
    getPluginConfig();
  }, []);
  return !loading && pluginConfig?.data ? /* @__PURE__ */ jsxRuntime.jsx(
    tinymceReact.Editor,
    {
      apiKey: apiKey || "",
      tinymceScriptSrc: pluginConfig?.data?.tinymceSrc || void 0,
      value,
      tagName: name,
      onEditorChange: (editorContent) => {
        onChange({ target: { name, value: editorContent } });
      },
      onInit: (evt, editor) => {
        console.log(pluginConfig);
        if (pluginConfig?.data?.editorConfig?.onInit) {
          pluginConfig?.data?.editorConfig?.onInit(editor);
        }
        if (typeof window !== "undefined" && pluginConfig?.data?.editorConfig?.setupFunctionName) {
          const setupFunction = window[pluginConfig?.data?.editorConfig?.setupFunctionName];
          if (typeof setupFunction === "function") {
            setupFunction(editor);
          }
        }
        console.log("HAHAHAHA 2");
      },
      init: {
        ...pluginConfig?.data?.editorConfig,
        images_upload_handler: async (blobInfo) => {
          const formData = new FormData();
          formData.append("files", blobInfo.blob());
          const response = await fetch(uploadUrl, {
            method: "POST",
            headers: {
              Authorization: "Bearer "
            },
            body: formData
          }).then((response2) => response2.json()).catch(function(err) {
            console.log("error:", err);
          });
          return response?.[0]?.url || "";
        }
      }
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
};
const MediaLib = ({ isOpen, onChange, onToggle }) => {
  const mediaLibraryDialog = admin.useStrapiApp("mediaLibrary", (state) => state.components);
  const MediaDialog = mediaLibraryDialog["media-library"];
  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime
    }));
    if (onChange)
      onChange(formattedFiles);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(MediaDialog, { onClose: onToggle, onSelectAssets: handleSelectAssets });
};
const Wysiwyg = ({ name, onChange, value, label, disabled, error, required, hint, attribute }) => {
  const localized = Boolean(attribute?.pluginOptions?.i18n?.localized || false);
  const [mediaLibVisible, setMediaLibVisible] = react.useState(false);
  const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
  const handleChangeAssets = (assets) => {
    let newValue = value ? value : "";
    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        const imgTag = `<p><img src="${asset.url}" alt="${asset.alt}"></img></p>`;
        newValue = `${newValue}${imgTag}`;
      }
      if (asset.mime.includes("video")) {
        const videoTag = `<video><source src="${asset.url}" alt="${asset.alt}"</source></video>`;
        newValue = `${newValue}${videoTag}`;
      }
    });
    onChange({ target: { name, value: newValue } });
    handleToggleMediaLib();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
      label && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingBottom: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: label }),
        required && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", fontWeight: "bold", textColor: "danger600", children: "*" }),
        localized && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingLeft: 1, children: /* @__PURE__ */ jsxRuntime.jsx(icons.Earth, { width: 12, height: 12 }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Image, {}),
          variant: "secondary",
          fullWidth: true,
          onClick: handleToggleMediaLib,
          children: "Media library"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(TinyEditor, { disabled: Boolean(disabled), name, onChange, value }),
      (error || hint) && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, children: error ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "danger600", children: error }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: hint }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      MediaLib,
      {
        isOpen: mediaLibVisible,
        onChange: handleChangeAssets,
        onToggle: handleToggleMediaLib
      }
    )
  ] });
};
exports.default = Wysiwyg;
//# sourceMappingURL=Wysiwyg-BhqJ7p8l.js.map
