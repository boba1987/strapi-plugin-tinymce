"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const index = require("./index-4X1ewlms.js");
const settings = require("./settings-B3aKnT7M.js");
const Settings = () => {
  const { toggleNotification } = admin.useNotification();
  const [currentApiKey, setCurrentApiKey] = react.useState("");
  const [isLoading, setIsLoading] = react.useState(false);
  const [isSaving, setIsSaving] = react.useState(false);
  react.useEffect(() => {
    setIsLoading(true);
    const getApiKey = async () => {
      const data = await settings.taskRequests.getSettings();
      if (data) {
        setIsLoading(false);
        return setCurrentApiKey(data.data.apiKey);
      }
    };
    getApiKey();
  }, [setCurrentApiKey]);
  const handleSubmit = async () => {
    setIsSaving(true);
    await settings.taskRequests.setSettings(currentApiKey);
    setIsSaving(false);
    toggleNotification({
      type: "success",
      message: formatMessage({
        id: index.getTranslation("settings.success-message"),
        defaultMessage: "Settings successfully updated"
      })
    });
  };
  const handleChange = (e) => {
    setCurrentApiKey(() => e.target.value);
  };
  const { formatMessage } = reactIntl.useIntl();
  const title = formatMessage({ id: index.getTranslation("settings.title"), defaultMessage: "TinyMCE" });
  const subtitle = formatMessage({
    id: index.getTranslation("settings.subtitle"),
    defaultMessage: "Manage the settings of your TinyMCE plugin"
  });
  const label = formatMessage({
    id: index.getTranslation("settings.content-title"),
    defaultMessage: "Set your API key for TinyMCE editor."
  });
  const fieldLabel = formatMessage({
    id: index.getTranslation("settings.input-title"),
    defaultMessage: "API key"
  });
  const fieldPlaceholder = formatMessage({
    id: index.getTranslation("settings.input-placeholder"),
    defaultMessage: "ex: ADASFNASF46564SAD"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "start", gap: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontWeight: "bold", children: title }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", fontWeight: "normal", children: subtitle })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {}) : /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          onClick: handleSubmit,
          size: "L",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
          disabled: isSaving,
          loading: isSaving,
          children: formatMessage({ id: index.getTranslation("settings.save-button"), defaultMessage: "Save" })
        }
      )
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingTop: 10, paddingBottom: 10, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 10, paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Box,
      {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        background: "neutral0",
        borderRadius: 1,
        shadow: "filterShadow",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", fontWeight: "normal", children: label }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { id: "api-key", paddingTop: 4, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: fieldLabel }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Field.Input,
              {
                type: "text",
                name: "key",
                value: currentApiKey,
                onChange: handleChange,
                placeholder: fieldPlaceholder
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
          ] })
        ]
      }
    ) })
  ] });
};
exports.default = Settings;
//# sourceMappingURL=Settings-CTYoTXfi.js.map
