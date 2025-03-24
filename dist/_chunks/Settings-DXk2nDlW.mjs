import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Box, Flex, Typography, Button, Loader, Field } from "@strapi/design-system";
import { useNotification } from "@strapi/strapi/admin";
import { Check } from "@strapi/icons";
import { useIntl } from "react-intl";
import { g as getTranslation } from "./index-Dbos3ASM.mjs";
import { t as taskRequests } from "./settings-fMCe_BmS.mjs";
const Settings = () => {
  const { toggleNotification } = useNotification();
  const [currentApiKey, setCurrentApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getApiKey = async () => {
      const data = await taskRequests.getSettings();
      if (data) {
        setIsLoading(false);
        return setCurrentApiKey(data.data.apiKey);
      }
    };
    getApiKey();
  }, [setCurrentApiKey]);
  const handleSubmit = async () => {
    setIsSaving(true);
    await taskRequests.setSettings(currentApiKey);
    setIsSaving(false);
    toggleNotification({
      type: "success",
      message: formatMessage({
        id: getTranslation("settings.success-message"),
        defaultMessage: "Settings successfully updated"
      })
    });
  };
  const handleChange = (e) => {
    setCurrentApiKey(() => e.target.value);
  };
  const { formatMessage } = useIntl();
  const title = formatMessage({ id: getTranslation("settings.title"), defaultMessage: "TinyMCE" });
  const subtitle = formatMessage({
    id: getTranslation("settings.subtitle"),
    defaultMessage: "Manage the settings of your TinyMCE plugin"
  });
  const label = formatMessage({
    id: getTranslation("settings.content-title"),
    defaultMessage: "Set your API key for TinyMCE editor."
  });
  const fieldLabel = formatMessage({
    id: getTranslation("settings.input-title"),
    defaultMessage: "API key"
  });
  const fieldPlaceholder = formatMessage({
    id: getTranslation("settings.input-placeholder"),
    defaultMessage: "ex: ADASFNASF46564SAD"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "start", gap: 1, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", fontWeight: "bold", children: title }),
        /* @__PURE__ */ jsx(Typography, { variant: "epsilon", fontWeight: "normal", children: subtitle })
      ] }),
      isLoading ? /* @__PURE__ */ jsx(Fragment, {}) : /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSubmit,
          size: "L",
          startIcon: /* @__PURE__ */ jsx(Check, {}),
          disabled: isSaving,
          loading: isSaving,
          children: formatMessage({ id: getTranslation("settings.save-button"), defaultMessage: "Save" })
        }
      )
    ] }) }),
    isLoading ? /* @__PURE__ */ jsx(Flex, { paddingTop: 10, paddingBottom: 10, alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsx(Box, { paddingBottom: 10, paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxs(
      Box,
      {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        background: "neutral0",
        borderRadius: 1,
        shadow: "filterShadow",
        children: [
          /* @__PURE__ */ jsx(Typography, { variant: "omega", fontWeight: "normal", children: label }),
          /* @__PURE__ */ jsxs(Field.Root, { id: "api-key", paddingTop: 4, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: fieldLabel }),
            /* @__PURE__ */ jsx(
              Field.Input,
              {
                type: "text",
                name: "key",
                value: currentApiKey,
                onChange: handleChange,
                placeholder: fieldPlaceholder
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, {}),
            /* @__PURE__ */ jsx(Field.Error, {})
          ] })
        ]
      }
    ) })
  ] });
};
export {
  Settings as default
};
//# sourceMappingURL=Settings-DXk2nDlW.mjs.map
