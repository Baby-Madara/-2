import { j as jsxRuntimeExports, h as House, B as Briefcase, i as ChartNoAxesColumn, k as Grid3x3, l as Settings, n as CircleQuestionMark, L as LogOut, o as CirclePlus, p as ArrowUpDown, q as Pen, r as Copy, T as Trash2, s as ChevronDown, X, I as Info, t as Compass, F as Folder, v as LayoutGrid, w as Image, x as ChevronRight$1, y as PenLine, E as Eye, z as Ellipsis, D as Sparkles, J as Plus, K as Search, U as Users, b as Smartphone, N as Monitor, Z as Zap, O as Megaphone, Q as MousePointer, R as MessageCircle, V as Funnel, W as ShoppingBag, Y as CircleAlert, _ as Check, $ as ExternalLink, G as Globe, a0 as Play, a1 as ThumbsUp, S as Share2, a2 as Heart, g as Send, a3 as Bookmark, a4 as CircleCheckBig, a5 as RefreshCw, a6 as RotateCcw, a7 as FolderOpen, a8 as FileText, a9 as Calendar, aa as PanelsTopLeft, ab as Download } from "./ui-vendor-a5hQU3E-.js";
import { h as useNavigate, r as reactExports, d as React } from "./react-vendor-DY0Dzq76.js";
import { N as Navbar } from "./Navbar-CFh3icge.js";
import "./index-BfaDYxno.js";
import "./utils-vendor-Bpu5wKGe.js";
const Sidebar = ({ activeTool, setActiveTool }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[60px] bg-[#303030] border-r border-[#444] flex flex-col items-center py-2 h-screen fixed left-0 top-0 z-50 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: () => navigate("/"),
        className: "mb-6 mt-2 p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors",
        title: "Exit Simulator",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#303030] font-bold text-xs", children: "∞" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-4 w-full px-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavItem,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 20 }),
          label: "Home",
          isActive: activeTool === "Home",
          onClick: () => setActiveTool("Home")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavItem,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 20 }),
          label: "Campaigns",
          isActive: activeTool === "Campaigns",
          onClick: () => setActiveTool("Campaigns")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavItem,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 20 }),
          label: "Ads Reporting",
          isActive: activeTool === "Ads Reporting",
          onClick: () => setActiveTool("Ads Reporting")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavItem,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { size: 20 }),
          label: "All Tools",
          isActive: activeTool === "All Tools",
          onClick: () => setActiveTool("All Tools")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col space-y-4 w-full mb-4 px-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 20 }), label: "Settings", isActive: activeTool === "Settings", onClick: () => setActiveTool("Settings") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { size: 20 }), label: "Help", isActive: activeTool === "Help", onClick: () => setActiveTool("Help") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onClick: () => navigate("/"),
          className: "w-full flex justify-center mt-2 pt-2 border-t border-gray-600 cursor-pointer group",
          title: "Back to Medestra",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-gray-400 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 20 }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full flex justify-center mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://ui-avatars.com/api/?name=Meta+User&background=random", alt: "Profile", className: "w-full h-full object-cover" }) }) })
    ] })
  ] });
};
const NavItem = ({ icon, label, isActive, onClick }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      className: `
            relative p-2.5 rounded-lg cursor-pointer transition-all duration-200 group
            ${isActive ? "bg-[#444] text-white" : "text-gray-400 hover:bg-[#444] hover:text-white"}
        `,
      children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[60]", children: label })
      ]
    }
  );
};
const CampaignTable = ({
  data,
  activeTab,
  selectedIds,
  visibleColumns,
  onToggleSelect,
  onToggleSelectAll,
  onStatusChange,
  onAdClick
}) => {
  const allSelected = data.length > 0 && data.every((item) => selectedIds.has(item.id));
  const isIndeterminate = selectedIds.size > 0 && !allSelected;
  const getNameLabel = () => {
    switch (activeTab) {
      case "Campaigns":
        return "Campaign";
      case "Ad Sets":
        return "Ad set";
      case "Ads":
        return "Ad";
      default:
        return "Name";
    }
  };
  const showCol = (key) => visibleColumns[key] !== false;
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center bg-[#F0F2F5] text-center p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-200 p-4 rounded-full mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 48, className: "text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[18px] font-bold text-[#1C1E21] mb-2", children: "No results found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] text-gray-500 mb-6", children: "You haven't created any ads yet." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col relative overflow-hidden bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto flex-1 custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse min-w-[1400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#F7F8FA] sticky top-0 z-20 text-[12px] font-bold text-[#65676B] shadow-[0_1px_0_#DADDE1]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 w-10 text-center border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            className: "rounded border-gray-400 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4 cursor-pointer",
            checked: allSelected,
            ref: (input) => {
              if (input) input.indeterminate = isIndeterminate;
            },
            onChange: (e) => onToggleSelectAll(e.target.checked)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 w-16 border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: [
          "Off / On ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12, className: "ml-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 min-w-[300px] border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: [
          getNameLabel(),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12, className: "ml-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 w-32 border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: [
          "Delivery ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12, className: "ml-1" })
        ] }) }),
        activeTab !== "Ads" && showCol("budget") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: [
          "Budget ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12, className: "ml-1" })
        ] }) }),
        activeTab === "Campaigns" && showCol("bidStrategy") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: "Bid Strategy" }) }),
        activeTab === "Ads" && showCol("qualityRanking") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center cursor-pointer hover:bg-gray-200/50 -m-2 p-2", children: "Quality Ranking" }) }),
        showCol("results") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300 text-right", children: "Results" }),
        showCol("reach") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300 text-right", children: "Reach" }),
        showCol("impressions") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300 text-right", children: "Impressions" }),
        showCol("costPerResult") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300 text-right", children: "Cost per result" }),
        showCol("amountSpent") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300 text-right", children: "Amount spent" }),
        showCol("ends") && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 border-r border-gray-300", children: "Ends" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-200 text-[13px] text-[#1C1E21]", children: [
        data.map((item) => {
          const isSelected = selectedIds.has(item.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `group ${isSelected ? "bg-[#F0F7FF]" : "hover:bg-gray-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center border-r border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "rounded border-gray-400 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4 cursor-pointer",
                    checked: isSelected,
                    onChange: () => onToggleSelect(item.id)
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex relative items-center cursor-pointer group/toggle", onClick: (e) => e.stopPropagation(), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "sr-only peer",
                      checked: item.delivery === "Active" || item.delivery === "Learning",
                      onChange: () => onStatusChange(item.id)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-[#1877F2] hover:after:scale-95 transition-colors" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-2 border-r border-gray-200 relative group-hover:pr-24", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1 h-8 mr-2 rounded-full ${item.delivery === "Active" ? "bg-[#31A24C]" : item.delivery === "Learning" ? "bg-yellow-400" : "bg-gray-300"}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-semibold text-[#1877F2] hover:underline cursor-pointer text-[13px]",
                          onClick: () => activeTab === "Ads" && onAdClick && onAdClick(item),
                          children: item.name
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-gray-500 hidden group-hover:block transition-opacity", children: [
                        "ID: ",
                        item.id
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 h-full items-center pr-2 bg-gradient-to-l from-gray-50 via-gray-50 to-transparent w-auto pl-8 hidden group-hover:flex z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1 text-gray-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mr-2 text-gray-500 hover:text-[#1877F2] cursor-pointer relative group/chart", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] hover:underline", children: "View Charts" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium text-white bg-[#1C1E21] rounded opacity-0 group-hover/chart:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm z-50", children: [
                        "View Performance",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1C1E21]" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActionButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12 }), label: "Edit" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActionButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }), label: "Duplicate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RowActionButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }), label: "Delete" })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center h-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] text-[#1C1E21]", children: item.delivery }),
                  item.delivery === "Active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500", children: "Run consistently" }),
                  item.delivery === "Learning" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-orange-600 font-medium", children: "Learning limited" }),
                  item.delivery === "In Draft" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-500", children: "Not published" })
                ] }) }),
                activeTab !== "Ads" && showCol("budget") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-gray-600", children: "budget" in item ? item.budget : "-" }),
                activeTab === "Campaigns" && showCol("bidStrategy") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-gray-600", children: "bidStrategy" in item ? item.bidStrategy : "-" }),
                activeTab === "Ads" && showCol("qualityRanking") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-gray-600", children: "qualityRanking" in item ? item.qualityRanking : "-" }),
                showCol("results") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-right", children: item.results }),
                showCol("reach") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-right tabular-nums", children: item.reach }),
                showCol("impressions") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-right tabular-nums", children: item.impressions }),
                showCol("costPerResult") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-right tabular-nums", children: item.costPerResult }),
                showCol("amountSpent") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-right tabular-nums", children: item.amountSpent }),
                showCol("ends") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-200 text-gray-500", children: item.ends })
              ]
            },
            item.id
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[#F7F8FA] font-bold text-[#1C1E21] text-[12px] border-t border-gray-300 shadow-inner", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right pr-4", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          activeTab !== "Ads" && showCol("budget") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          activeTab === "Campaigns" && showCol("bidStrategy") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          activeTab === "Ads" && showCol("qualityRanking") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" }),
          showCol("results") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right", children: "19,629" }),
          showCol("reach") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right", children: "68,700" }),
          showCol("impressions") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right", children: "87,200" }),
          showCol("costPerResult") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right", children: "$3.21" }),
          showCol("amountSpent") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300 text-right", children: "$3,171.90" }),
          showCol("ends") && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 border-r border-gray-300" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-8 border-t border-gray-300 text-[12px] text-[#1C1E21] bg-[#F7F8FA] flex justify-between items-center px-4 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${selectedIds.size > 0 ? "text-[#1877F2]" : ""}`, children: selectedIds.size > 0 ? `${selectedIds.size} selected` : `${data.length} ${activeTab.toLowerCase()}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-6 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "cursor-pointer", children: [
          "Rows per page: 20 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 10, className: "inline ml-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "1-",
          data.length,
          " of ",
          data.length
        ] })
      ] })
    ] })
  ] });
};
const RowActionButton = ({ icon, label, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "button",
  {
    className: "p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-800 relative group/btn transition-colors",
    onClick: (e) => {
      e.stopPropagation();
      if (onClick) onClick();
    },
    children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium text-white bg-[#1C1E21] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm", children: [
        label,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1C1E21]" })
      ] })
    ]
  }
);
const CreateModal = ({ isOpen, onClose, onCreate, initialData, context }) => {
  const [currentStep, setCurrentStep] = reactExports.useState(1);
  const [selectedObjective, setSelectedObjective] = reactExports.useState("awareness");
  const [buyingType, setBuyingType] = reactExports.useState("Auction");
  const [campaignName, setCampaignName] = reactExports.useState("New Awareness Campaign");
  const [specialAdCategories, setSpecialAdCategories] = reactExports.useState(false);
  const [advPlusBudget, setAdvPlusBudget] = reactExports.useState(false);
  const [abTesting, setAbTesting] = reactExports.useState(false);
  const [campaignBudget, setCampaignBudget] = reactExports.useState("50.00");
  const [campaignBudgetType, setCampaignBudgetType] = reactExports.useState("Daily budget");
  const [campaignBidStrategy, setCampaignBidStrategy] = reactExports.useState("Highest volume");
  const [adSetName, setAdSetName] = reactExports.useState("New Awareness Ad Set");
  const [performanceGoal, setPerformanceGoal] = reactExports.useState("Maximize reach of ads");
  const [facebookPage, setFacebookPage] = reactExports.useState("Acme Corp");
  const [adSetBudgetType, setAdSetBudgetType] = reactExports.useState("Daily budget");
  const [adSetBudgetAmount, setAdSetBudgetAmount] = reactExports.useState("20.00");
  const [startDate, setStartDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [startTime, setStartTime] = reactExports.useState("00:00");
  const [endDate, setEndDate] = reactExports.useState("");
  const [endTime, setEndTime] = reactExports.useState("23:59");
  const [audienceLocation, setAudienceLocation] = reactExports.useState("United States");
  const [minAge, setMinAge] = reactExports.useState("18");
  const [gender, setGender] = reactExports.useState("All");
  const [languages, setLanguages] = reactExports.useState("All languages");
  const [targetingQuery, setTargetingQuery] = reactExports.useState("");
  const [includedInterests, setIncludedInterests] = reactExports.useState([]);
  const [showBrowseMenu, setShowBrowseMenu] = reactExports.useState(false);
  const [placementType, setPlacementType] = reactExports.useState("advantage");
  const [adScheduling, setAdScheduling] = reactExports.useState(false);
  const [platforms, setPlatforms] = reactExports.useState({
    facebook: true,
    instagram: true,
    audienceNetwork: true,
    messenger: true,
    whatsapp: false
  });
  const [adName, setAdName] = reactExports.useState("New Awareness Ad");
  const [identityPage, setIdentityPage] = reactExports.useState("Acme Corp");
  const [instagramAccount, setInstagramAccount] = reactExports.useState("");
  const [adSetup, setAdSetup] = reactExports.useState("create_ad");
  const [format, setFormat] = reactExports.useState("single");
  const [multiAdvertiser, setMultiAdvertiser] = reactExports.useState(true);
  const [primaryText, setPrimaryText] = reactExports.useState("");
  const [headline, setHeadline] = reactExports.useState("");
  const [websiteUrl, setWebsiteUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        if (context === "Campaigns") {
          setCurrentStep(2);
          setCampaignName(initialData.name);
          if (initialData.budget) {
            setCampaignBudget(initialData.budget.replace(/[^0-9.]/g, ""));
            setAdvPlusBudget(true);
          }
        } else if (context === "Ad Sets") {
          setCurrentStep(3);
          setAdSetName(initialData.name);
          if (initialData.budget) setAdSetBudgetAmount(initialData.budget.replace(/[^0-9.]/g, ""));
        } else if (context === "Ads") {
          setCurrentStep(4);
          setAdName(initialData.name);
          if (initialData.creative) {
            setPrimaryText(initialData.creative.primaryText || "");
            setHeadline(initialData.creative.headline || "");
          }
        } else {
          setCurrentStep(2);
        }
      } else {
        setCurrentStep(1);
        setCampaignName("New Awareness Campaign");
        setAdSetName("New Awareness Ad Set");
        setAdName("New Awareness Ad");
        setCampaignBudget("50.00");
        setCampaignBudgetType("Daily budget");
        setCampaignBidStrategy("Highest volume");
        setAdSetBudgetAmount("20.00");
        setPrimaryText("");
        setHeadline("");
        setIncludedInterests([]);
        setPlacementType("advantage");
        setGender("All");
        setShowBrowseMenu(false);
        setAdScheduling(false);
      }
    }
  }, [isOpen, initialData, context]);
  const toggleInterest = (interest) => {
    if (includedInterests.includes(interest)) {
      setIncludedInterests(includedInterests.filter((i) => i !== interest));
    } else {
      setIncludedInterests([...includedInterests, interest]);
      setTargetingQuery("");
    }
  };
  const togglePlatform = (key) => {
    setPlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  if (!isOpen) return null;
  const objectives = [
    { id: "awareness", name: "Awareness", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 20 }), description: "Show your ads to people who are most likely to remember them.", goodFor: "Reach, Brand awareness, Video views" },
    { id: "traffic", name: "Traffic", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointer, { size: 20 }), description: "Send people to a destination, like your website, app or Instagram event.", goodFor: "Link clicks, Landing page views" },
    { id: "engagement", name: "Engagement", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20 }), description: "Get more messages, video views, post engagement, page likes or event responses.", goodFor: "Messages, Video views" },
    { id: "leads", name: "Leads", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 20 }), description: "Collect leads for your business or brand.", goodFor: "Instant forms, Messenger, Conversions" },
    { id: "app_promotion", name: "App promotion", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 20 }), description: "Find new people to install your app and continue using it.", goodFor: "App installs, App events" },
    { id: "sales", name: "Sales", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }), description: "Find people likely to purchase your product or service.", goodFor: "Conversions, Catalogue sales" }
  ];
  const handleOpenMediaLibrary = (type) => {
    console.log(`Open ${type} media library`);
  };
  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      let resultData = {};
      if (initialData && context === "Ad Sets") {
        resultData = {
          name: adSetName,
          budget: `$${adSetBudgetAmount} ${adSetBudgetType === "Daily budget" ? "Daily" : "Lifetime"}`,
          schedule: "Ongoing"
        };
      } else if (initialData && context === "Ads") {
        resultData = {
          name: adName,
          creative: {
            ...initialData.creative,
            primaryText,
            headline
          }
        };
      } else {
        resultData = {
          name: campaignName,
          bidStrategy: advPlusBudget ? campaignBidStrategy : "Lowest cost",
          budget: `$${advPlusBudget ? campaignBudget : adSetBudgetAmount} ${advPlusBudget ? campaignBudgetType === "Daily budget" ? "Daily" : "Lifetime" : adSetBudgetType === "Daily budget" ? "Daily" : "Lifetime"}`,
          ends: endDate ? new Date(endDate).toLocaleDateString() : "Ongoing"
        };
      }
      onCreate(resultData);
    }
  };
  const SidebarItem = ({ stepId, label, icon, isChild = false, isActive = false, hasError = false }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => currentStep > 1 && setCurrentStep(stepId),
        className: `
                flex items-center px-4 py-2 cursor-pointer transition-all relative group select-none
                ${isActive ? "bg-[#EBF5FF]" : "hover:bg-gray-100"}
                ${isChild ? "pl-8" : ""}
            `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mr-3 ${isActive ? "text-[#1877F2]" : "text-gray-500"}`, children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[13px] block truncate ${isActive ? "text-[#1877F2] font-semibold" : "text-[#1C1E21] font-medium"}`, children: label }),
            hasError && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-red-500 flex items-center mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 10, className: "mr-1" }),
              " 1 Error"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 14 }) })
        ]
      }
    );
  };
  const renderInitialModal = () => {
    var _a, _b;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col bg-white rounded-lg shadow-xl overflow-hidden max-w-[800px] w-full max-h-[650px] relative animate-scale-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-3 border-b border-gray-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[16px] font-bold text-[#1C1E21]", children: "Create new campaign" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-bold text-[#1C1E21] mr-1", children: "Choose a buying type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "text-gray-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: buyingType,
                onChange: (e) => setBuyingType(e.target.value),
                className: "w-full p-2.5 bg-white border border-gray-300 rounded-md text-[14px] text-[#1C1E21] font-medium appearance-none focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none cursor-pointer hover:border-gray-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Auction" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Reservation" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-bold text-[#1C1E21] block mb-3", children: "Choose a campaign objective" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 space-y-2", children: objectives.map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `
                                    flex items-center p-3 rounded-md cursor-pointer border transition-all
                                    ${selectedObjective === obj.id ? "bg-[#EBF5FF] border-[#EBF5FF]" : "bg-white border-transparent hover:bg-gray-100"}
                                `,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "objective",
                      checked: selectedObjective === obj.id,
                      onChange: () => setSelectedObjective(obj.id),
                      className: "hidden"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
                                    w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 transition-colors
                                    ${selectedObjective === obj.id ? "bg-[#1877F2] text-white" : "bg-[#E4E6EB] text-gray-600"}
                                `, children: React.cloneElement(obj.icon, { size: 20 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-semibold text-[#1C1E21]", children: obj.name })
                ]
              },
              obj.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 flex flex-col justify-center text-gray-600 pl-4 border-l border-gray-100", children: selectedObjective ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-48 h-32", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gray-100 rounded-lg border border-dashed border-gray-300" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full", style: { overflow: "visible" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40,30 Q90,10 120,60 T180,80", fill: "none", stroke: "#A0AEC0", strokeWidth: "2", strokeDasharray: "6,4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "40", cy: "30", r: "6", fill: "#4FD1C5" }),
                  " "
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-10 bg-white p-2 rounded-full shadow-lg border border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { size: 32, className: "text-[#364a5f]", fill: "#364a5f" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: (_a = objectives.find((o) => o.id === selectedObjective)) == null ? void 0 : _a.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-gray-500 text-[11px] uppercase mb-1", children: "Good for:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500", children: (_b = objectives.find((o) => o.id === selectedObjective)) == null ? void 0 : _b.goodFor })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[13px]", children: "Select an objective to see details." }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-gray-300 flex justify-between items-center bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-[14px] font-semibold text-[#1877F2] hover:underline", children: "About campaign objectives" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              className: "px-4 py-2 rounded-md bg-[#E4E6EB] hover:bg-[#D8DADF] text-[14px] font-semibold text-[#4B4C4F] transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleContinue,
              className: "px-8 py-2 rounded-md bg-[#1877F2] hover:bg-[#166fe5] text-[14px] font-bold text-white transition-colors shadow-sm",
              children: "Continue"
            }
          )
        ] })
      ] })
    ] });
  };
  const renderMainEditor = () => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full bg-[#F0F2F5] animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[280px] bg-white border-r border-gray-300 flex flex-col shrink-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-gray-100 flex items-center text-[12px] font-bold text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpenIcon, { className: "mr-2", size: 14 }),
          " Campaigns"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarItem,
            {
              stepId: 2,
              label: campaignName || "New Campaign",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 16, fill: currentStep === 2 ? "#1877F2" : "#99C2FF", className: currentStep === 2 ? "text-[#1877F2]" : "text-[#99C2FF]" }),
              isActive: currentStep === 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarItem,
            {
              stepId: 3,
              label: adSetName || "New Ad Set",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 16, className: currentStep === 3 ? "text-[#1877F2]" : "text-gray-400" }),
              isChild: true,
              isActive: currentStep === 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarItem,
            {
              stepId: 4,
              label: adName || "New Ad",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 16, className: currentStep === 4 ? "text-[#1877F2]" : "text-gray-400" }),
              isChild: true,
              isActive: currentStep === 4
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden relative min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-300 px-6 py-3 flex justify-between items-center shrink-0 shadow-sm z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-[12px] text-gray-500 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 14, className: "text-[#1877F2]", fill: "#1877F2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#1877F2] font-medium truncate max-w-[150px]", children: campaignName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight$1, { size: 12 }),
            currentStep > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `truncate max-w-[150px] ${currentStep === 3 ? "text-[#1877F2] font-medium" : ""}`, children: "1 Ad set" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight$1, { size: 12 })
            ] }),
            currentStep > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#1877F2] font-medium truncate max-w-[150px]", children: "1 Ad" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1 bg-[#F0F2F5] p-1 rounded-md shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-4 py-1 bg-white shadow-sm rounded text-[13px] font-semibold text-[#1877F2] flex items-center transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 12, className: "mr-1.5" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-4 py-1 text-[13px] font-semibold text-gray-600 hover:bg-gray-200 rounded flex items-center transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12, className: "mr-1.5" }),
              " Review"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[12px] font-medium text-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 mr-2" }),
              " In draft"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block w-10 align-middle select-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: true, className: "toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-[#1877F2] checked:bg-[#1877F2] transition-all" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block overflow-hidden h-5 rounded-full bg-[#1877F2] opacity-50 cursor-pointer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 20, className: "text-gray-500 hover:text-gray-700" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1 hover:bg-gray-100 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20, className: "text-gray-500" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 bg-[#F0F2F5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6 max-w-[1200px] mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4 min-w-0", children: [
            currentStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Campaign name", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: campaignName,
                    onChange: (e) => setCampaignName(e.target.value),
                    className: "flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none",
                    placeholder: "Enter your campaign name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-md text-[14px] font-semibold bg-[#F0F2F5] hover:bg-gray-200 text-[#4B4C4F]", children: "Create template" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Special Ad Categories", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 mb-3", children: "Declare if your ads are related to credit, employment or housing, or about social issues, elections or politics." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      className: "w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none cursor-pointer",
                      onChange: (e) => setSpecialAdCategories(e.target.value !== "none"),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "Choose a category" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "credit", children: "Credit" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "employment", children: "Employment" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "housing", children: "Housing" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "social", children: "Social Issues, Elections or Politics" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Campaign details", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold text-gray-500 mb-1", children: "Buying type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] text-[#1C1E21]", children: buyingType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] font-bold text-gray-500 mb-1 flex items-center", children: [
                    "Campaign objective ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "ml-1" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] text-[#1C1E21]", children: (_a = objectives.find((o) => o.id === selectedObjective)) == null ? void 0 : _a.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-[#1877F2] font-semibold cursor-pointer hover:underline", children: "Show more options" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "A/B test", toggle: true, checked: abTesting, onToggle: () => setAbTesting(!abTesting), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 max-w-lg mb-0", children: "Help improve ad performance by comparing versions to see what works best." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Advantage+ campaign budget", toggle: true, checked: advPlusBudget, onToggle: () => setAdvPlusBudget(!advPlusBudget), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-[#1877F2] ml-1 fill-current" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 max-w-lg", children: "Advantage+ campaign budget automatically distributes your budget across your currently delivering ad sets to get better results." }),
                advPlusBudget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 animate-fade-in space-y-4 border-t border-gray-100 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-[200px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-2.5 text-gray-500 font-bold", children: "$" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: campaignBudget,
                          onChange: (e) => setCampaignBudget(e.target.value),
                          className: "w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: campaignBudgetType,
                          onChange: (e) => setCampaignBudgetType(e.target.value),
                          className: "px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none pr-8 cursor-pointer focus:border-[#1877F2] outline-none",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Daily budget" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Lifetime budget" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "absolute right-2 top-3 text-gray-500 pointer-events-none" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Campaign bid strategy" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: campaignBidStrategy,
                          onChange: (e) => setCampaignBidStrategy(e.target.value),
                          className: "w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Highest volume", children: "Highest volume" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Cost per result goal", children: "Cost per result goal" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bid cap", children: "Bid cap" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 p-2 bg-gray-50 rounded text-[11px] text-gray-500 border border-gray-100", children: [
                      campaignBidStrategy === "Highest volume" && "Get the most results for your budget.",
                      campaignBidStrategy === "Cost per result goal" && "Aim for a certain cost per result while maximizing volume.",
                      campaignBidStrategy === "Bid cap" && "Set a limit on what to bid in each auction."
                    ] })
                  ] }),
                  campaignBudgetType === "Lifetime budget" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start text-[12px] text-gray-600 bg-blue-50 p-2 rounded border border-blue-100", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 14, className: "text-[#1877F2] mr-2 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "You can now schedule ads in your ad sets." })
                  ] })
                ] })
              ] }) })
            ] }),
            currentStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Ad set name", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: adSetName,
                    onChange: (e) => setAdSetName(e.target.value),
                    className: "flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3 py-2 border border-gray-300 rounded-md text-[14px] font-semibold bg-[#F0F2F5] hover:bg-gray-200 text-[#4B4C4F]", children: "Create template" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Conversion", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold text-gray-500 mb-2", children: "Performance goal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: performanceGoal,
                        onChange: (e) => setPerformanceGoal(e.target.value),
                        className: "w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maximize reach of ads" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maximize number of impressions" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maximize ad recall lift" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[14px] font-bold text-[#1C1E21] flex items-center", children: [
                    "Facebook Page ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "ml-1 text-gray-500" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] flex items-center cursor-pointer hover:border-gray-400", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://ui-avatars.com/api/?name=Acme+Corp&background=random", alt: "", className: "w-full h-full" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium text-[#1C1E21]", children: facebookPage }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "text-gray-500" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Budget & schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 pb-4 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-2", children: "Budget" }),
                  advPlusBudget ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-600 flex items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "mr-2 mt-0.5 text-[#1877F2] shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Campaign budget is on. Budget is controlled at the campaign level." })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: adSetBudgetType,
                          onChange: (e) => setAdSetBudgetType(e.target.value),
                          className: "px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none pr-8 cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Daily budget" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Lifetime budget" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "absolute right-2 top-3 text-gray-500 pointer-events-none" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-[150px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-2.5 text-gray-500 font-bold", children: "$" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: adSetBudgetAmount,
                          onChange: (e) => setAdSetBudgetAmount(e.target.value),
                          className: "w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none text-right"
                        }
                      )
                    ] })
                  ] }),
                  !advPlusBudget && adSetBudgetType === "Lifetime budget" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[11px] text-gray-500", children: [
                    "You won't spend more than $",
                    adSetBudgetAmount,
                    " during the lifetime of your ad set."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Start date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Time" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "time",
                        value: startTime,
                        onChange: (e) => setStartTime(e.target.value),
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                      }
                    )
                  ] })
                ] }),
                !endDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "setEndDate", className: "mr-2", onChange: (e) => e.target.checked && setEndDate(startDate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "setEndDate", className: "text-[14px] text-[#1C1E21]", children: "Set an end date" })
                ] }),
                endDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "End date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Time" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "time",
                        value: endTime,
                        onChange: (e) => setEndTime(e.target.value),
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[12px] font-bold text-gray-500", children: "Ad scheduling" }) }),
                  adSetBudgetType === "Lifetime budget" && !advPlusBudget || advPlusBudget && campaignBudgetType === "Lifetime budget" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: adScheduling,
                          onChange: (e) => setAdScheduling(e.target.checked),
                          className: "mr-2 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2]"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-[#1C1E21]", children: "Run ads on a schedule" })
                    ] }),
                    adScheduling && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-300 rounded-md p-4 animate-fade-in bg-white", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Use viewer's time zone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] text-gray-500", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-[#1877F2] mr-1.5 rounded-sm" }),
                          " Scheduled"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[40px_1fr] gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-gray-400 space-y-3 pt-5 text-right font-medium", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Mon" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Tue" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Wed" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Thu" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Fri" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Sat" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Sun" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-gray-400 mb-1 px-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12am" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "6" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "9" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12pm" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "6" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "9" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 bg-gray-50 border border-gray-200 rounded p-1", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 flex rounded-sm overflow-hidden bg-white border border-gray-100", children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `flex-1 border-r border-gray-50 last:border-0 hover:bg-blue-200 transition-colors cursor-pointer ${// Pre-fill some slots for simulation
                              day !== "Sat" && day !== "Sun" && i >= 9 && i <= 17 ? "bg-[#1877F2]" : (day === "Sat" || day === "Sun") && i >= 10 && i <= 14 ? "bg-[#1877F2]" : ""}`,
                              title: `${day} ${i}:00`
                            },
                            i
                          )) }, day)) })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[11px] text-gray-400 text-center", children: "Click or drag to select times to show your ads." })
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start bg-gray-50 p-3 rounded-md text-[13px] text-gray-600", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "mr-2 mt-0.5 text-gray-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ad scheduling is only available with a lifetime budget. Switch to a lifetime budget to use this feature." })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Audience Controls", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Locations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:border-gray-400 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px]", children: audienceLocation }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 14, className: "text-gray-500" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Minimum age" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:border-gray-400 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[14px]", children: [
                      minAge,
                      "+"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 14, className: "text-gray-500" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[#1877F2] text-[14px] font-semibold hover:underline", children: "Show more options" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Audience", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, className: "text-[#1C1E21] mr-2" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F0F2F5] p-3 rounded-md text-[13px] text-gray-600 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "Advantage+ audience" }),
                  " is automatically using AI to find your audience. You can add specific targeting below as a suggestion."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Gender" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-4", children: ["All", "Men", "Women"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "gender",
                        checked: gender === g,
                        onChange: () => setGender(g),
                        className: "mr-2 text-[#1877F2] focus:ring-[#1877F2]"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px]", children: g })
                  ] }, g)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500", children: "Detailed Targeting" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => setShowBrowseMenu(!showBrowseMenu),
                        className: "text-[13px] font-semibold text-[#1877F2] hover:bg-[#EBF5FF] px-2 py-1 rounded transition-colors",
                        children: "Browse"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-400 mb-2", children: "Include people who match" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-wrap gap-2 p-2 border ${showBrowseMenu ? "border-[#1877F2] ring-1 ring-[#1877F2]" : "border-gray-300"} rounded-md bg-white min-h-[42px] focus-within:ring-1 focus-within:ring-[#1877F2] focus-within:border-[#1877F2] transition-all`, children: [
                      includedInterests.map((interest) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-[#EBF5FF] text-[#0064D1] px-2 py-1 rounded-full text-[13px] font-medium flex items-center animate-fade-in", children: [
                        interest,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "ml-1 cursor-pointer hover:text-blue-800", onClick: () => toggleInterest(interest) })
                      ] }, interest)),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: targetingQuery,
                          onChange: (e) => {
                            setTargetingQuery(e.target.value);
                            if (e.target.value) setShowBrowseMenu(false);
                          },
                          onFocus: () => setShowBrowseMenu(false),
                          placeholder: includedInterests.length > 0 ? "" : "Add demographics, interests or behaviors",
                          className: "flex-1 outline-none text-[14px] min-w-[150px] bg-transparent",
                          onKeyDown: (e) => {
                            if (e.key === "Enter" && targetingQuery) {
                              toggleInterest(targetingQuery);
                            }
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "absolute right-3 top-3.5 text-gray-400 pointer-events-none" })
                  ] }),
                  targetingQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-20 w-full bg-white border border-gray-200 shadow-xl rounded-md mt-1 max-h-60 overflow-auto animate-fade-in", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-[11px] font-bold text-gray-500 bg-gray-50 border-b border-gray-100", children: "SUGGESTIONS" }),
                    [
                      { name: "Marketing", type: "Interest" },
                      { name: "Social Media", type: "Interest" },
                      { name: "Small Business", type: "Interest" },
                      { name: "Advertising", type: "Interest" },
                      { name: "Technology", type: "Interest" },
                      { name: "Fitness", type: "Interest" },
                      { name: "Business Owner", type: "Job Title" },
                      { name: "Engaged Shoppers", type: "Behavior" },
                      { name: "University Graduate", type: "Demographic" }
                    ].filter((i) => i.name.toLowerCase().includes(targetingQuery.toLowerCase())).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-3 py-2 hover:bg-gray-100 cursor-pointer text-[14px] flex justify-between items-center group",
                        onClick: () => {
                          toggleInterest(i.name);
                          setTargetingQuery("");
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-[#1C1E21]", children: i.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-gray-500", children: i.type })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, className: "text-gray-400 group-hover:text-[#1877F2]" })
                        ]
                      },
                      i.name
                    ))
                  ] }),
                  showBrowseMenu && !targetingQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-20 w-full bg-white border border-gray-200 shadow-xl rounded-md mt-1 max-h-60 overflow-auto animate-fade-in", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-[11px] font-bold text-gray-500 bg-gray-50 border-b border-gray-100", children: "BROWSE" }),
                    ["Demographics", "Interests", "Behaviors"].map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-0 group",
                        onClick: () => {
                          setTargetingQuery(category.slice(0, 3));
                          setShowBrowseMenu(false);
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 16, className: "text-gray-400 mr-3 group-hover:text-[#1C1E21]" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: category })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight$1, { size: 16, className: "text-gray-400" })
                        ]
                      },
                      category
                    ))
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Languages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: languages,
                      onChange: (e) => setLanguages(e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Placements", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start p-3 rounded-md border cursor-pointer transition-all ${placementType === "advantage" ? "bg-[#F0F7FF] border-[#1877F2]" : "hover:bg-gray-50 border-gray-200"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "placements",
                      checked: placementType === "advantage",
                      onChange: () => setPlacementType("advantage"),
                      className: "mt-1 mr-3 text-[#1877F2] focus:ring-[#1877F2]"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-bold text-[#1C1E21]", children: "Advantage+ placements (Recommended)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, className: "text-[#1877F2] ml-1 fill-current" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-500 mt-0.5", children: "Use Advantage+ placements to maximize your budget and help show your ads to more people." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start p-3 rounded-md border cursor-pointer transition-all ${placementType === "manual" ? "bg-white border-gray-300 ring-1 ring-[#1877F2] border-[#1877F2]" : "hover:bg-gray-50 border-gray-200"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "placements",
                      checked: placementType === "manual",
                      onChange: () => setPlacementType("manual"),
                      className: "mt-1 mr-3 text-[#1877F2] focus:ring-[#1877F2]"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-bold text-[#1C1E21]", children: "Manual placements" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-gray-500 mt-0.5", children: "Manually choose the places to show your ad." })
                  ] })
                ] }),
                placementType === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-8 pt-2 animate-fade-in", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold text-gray-500 mb-2", children: "Devices" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6 mb-4 text-[14px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "mr-2 rounded text-[#1877F2] focus:ring-[#1877F2]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 16, className: "mr-1 text-gray-500" }),
                      " Mobile"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "mr-2 rounded text-[#1877F2] focus:ring-[#1877F2]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { size: 16, className: "mr-1 text-gray-500" }),
                      " Desktop"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold text-gray-500 mb-2", children: "Platforms" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: platforms.facebook, onChange: () => togglePlatform("facebook"), className: "mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: "Facebook" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: platforms.instagram, onChange: () => togglePlatform("instagram"), className: "mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: "Instagram" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: platforms.audienceNetwork, onChange: () => togglePlatform("audienceNetwork"), className: "mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: "Audience Network" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: platforms.messenger, onChange: () => togglePlatform("messenger"), className: "mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: "Messenger" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: platforms.whatsapp, onChange: () => togglePlatform("whatsapp"), className: "mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-medium text-[#1C1E21]", children: "WhatsApp" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-[12px] flex items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 14, className: "mr-2 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Asset customization available in the Ad level." })
                  ] })
                ] })
              ] }) })
            ] }),
            currentStep === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Ad name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: adName,
                  onChange: (e) => setAdName(e.target.value),
                  className: "flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none"
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Identity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Facebook Page" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: identityPage,
                        onChange: (e) => setIdentityPage(e.target.value),
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] font-medium appearance-none focus:border-[#1877F2] outline-none",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Acme Corp" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Acme Lifestyle" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Instagram account" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none text-gray-600",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Use selected page" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "absolute right-3 top-3 text-gray-500 pointer-events-none" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Ad setup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-[14px] font-semibold text-gray-500 border-b border-gray-200 pb-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: `pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === "create_ad" ? "text-[#1877F2] border-[#1877F2]" : "border-transparent hover:text-gray-700"}`,
                      onClick: () => setAdSetup("create_ad"),
                      children: "Create ad"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: `pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === "existing_post" ? "text-[#1877F2] border-[#1877F2]" : "border-transparent hover:text-gray-700"}`,
                      onClick: () => setAdSetup("existing_post"),
                      children: "Use existing post"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: `pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === "mockup" ? "text-[#1877F2] border-[#1877F2]" : "border-transparent hover:text-gray-700"}`,
                      onClick: () => setAdSetup("mockup"),
                      children: "Use Creative Hub mockup"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[12px] text-gray-500 uppercase", children: "Format" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start cursor-pointer group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "format", checked: format === "single", onChange: () => setFormat("single"), className: "mt-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[14px] font-semibold text-[#1C1E21]", children: "Single image or video" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "One image or video, or a slideshow with multiple images." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start cursor-pointer group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "format", checked: format === "carousel", onChange: () => setFormat("carousel"), className: "mt-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[14px] font-semibold text-[#1C1E21]", children: "Carousel" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Two or more scrollable images or videos." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start cursor-pointer group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "format", checked: format === "collection", onChange: () => setFormat("collection"), className: "mt-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[14px] font-semibold text-[#1C1E21]", children: "Collection" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500", children: "Group of items that opens into a fullscreen mobile experience." })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: multiAdvertiser, onChange: () => setMultiAdvertiser(!multiAdvertiser), className: "mt-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[14px] font-semibold text-[#1C1E21]", children: "Multi-advertiser ads" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-gray-500 max-w-md block", children: "Enabling this may increase your ad's exposure to people in a shopping mindset." })
                  ] })
                ] }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Ad creative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center min-h-[160px] border-dashed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-200 p-3 rounded-full mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 24, className: "text-gray-500" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOpenMediaLibrary("image"), className: "px-4 py-2 bg-white border border-gray-300 rounded-md text-[14px] font-bold shadow-sm hover:bg-gray-50 text-gray-700", children: "Add Image" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOpenMediaLibrary("video"), className: "px-4 py-2 bg-white border border-gray-300 rounded-md text-[14px] font-bold shadow-sm hover:bg-gray-50 text-gray-700", children: "Add Video" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Primary Text" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none min-h-[100px]",
                        value: primaryText,
                        onChange: (e) => setPrimaryText(e.target.value),
                        placeholder: "Tell people what your ad is about"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 flex gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1 hover:bg-gray-100 rounded text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }) }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Headline" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none",
                      value: headline,
                      onChange: (e) => setHeadline(e.target.value),
                      placeholder: "Write a short headline"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[12px] font-bold text-gray-500 mb-1", children: "Website URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none",
                      value: websiteUrl,
                      onChange: (e) => setWebsiteUrl(e.target.value),
                      placeholder: "https://example.com"
                    }
                  )
                ] })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-[320px] shrink-0 space-y-4", children: [
            currentStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-12 h-12 mr-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "24", cy: "24", r: "20", stroke: "#E4E6EB", strokeWidth: "4", fill: "none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "24", cy: "24", r: "20", stroke: "#31A24C", strokeWidth: "4", fill: "none", strokeDasharray: "125", strokeDashoffset: "0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-[12px] font-bold text-[#31A24C]", children: "100" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[14px] font-bold text-[#1C1E21] flex items-center", children: [
                  "Campaign score ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "ml-1 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500", children: "You're using our recommended setup." })
              ] })
            ] }) }),
            currentStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[14px] font-bold text-[#1C1E21] flex items-center", children: [
                "Audience definition ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "ml-1 text-gray-400" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-600 mb-4 font-medium", children: "Your audience is broad." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-2 bg-gray-200 rounded-full mb-2 overflow-hidden flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/4 bg-red-400 h-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/4 bg-yellow-400 h-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 bg-green-500 h-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 bottom-0 w-1 bg-black left-[85%] border-l border-white" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-gray-500 mb-4 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Narrow" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Broad" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pt-3 border-t border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] text-gray-500 mb-1 flex items-center", children: [
                  "Estimated audience size ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 12, className: "ml-1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[18px] font-bold text-[#1C1E21]", children: "30,500,000 - 35,900,000" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-blue-50 rounded-md flex items-start border border-blue-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-[#1877F2] mt-0.5 mr-2 shrink-0", fill: "currentColor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-600 leading-snug", children: "Estimates do not include Advantage+ audience options and may vary significantly over time based on your targeting selections and available data." })
              ] })
            ] }),
            currentStep === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-0 rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold text-gray-500", children: "Ad Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1 hover:bg-gray-200 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2Icon, { size: 14 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1 hover:bg-gray-200 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLinkIcon, { size: 14 }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[280px] border border-gray-200 bg-white rounded-md shadow-sm overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gray-200 mr-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-2 bg-gray-200 rounded mb-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-2 bg-gray-100 rounded" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-2 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-gray-100 rounded" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-2 bg-gray-100 rounded" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-gray-100 w-full flex items-center justify-center text-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 32 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-2 bg-gray-200 rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-2 bg-gray-300 rounded" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1 bg-gray-200 rounded text-[10px] font-bold text-gray-500", children: "LEARN MORE" })
                ] })
              ] }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-gray-300 bg-white flex justify-between items-center shrink-0 z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors", children: "Close" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3", children: [
            currentStep > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentStep(currentStep - 1), className: "px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors", children: "Back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => currentStep < 4 ? setCurrentStep(currentStep + 1) : handleContinue(),
                className: "px-8 py-2 bg-[#1877F2] hover:bg-[#166fe5] rounded-md text-[14px] font-bold text-white shadow-sm transition-colors",
                children: initialData ? "Update" : currentStep === 4 ? "Publish" : "Next"
              }
            )
          ] })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300`, children: currentStep === 1 ? renderInitialModal() : renderMainEditor() });
};
const Card = ({ title, children, toggle, checked, onToggle, icon }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-lg shadow-sm border border-gray-200 group hover:border-gray-300 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, className: "text-green-600 mr-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[16px] font-bold text-[#1C1E21] flex items-center", children: [
          title,
          " ",
          icon
        ] })
      ] }),
      toggle && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block w-10 align-middle select-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked, onChange: onToggle, className: "toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-[#1877F2] checked:bg-[#1877F2] transition-all" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${checked ? "bg-[#1877F2] opacity-50" : "bg-gray-300"}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `transition-opacity duration-200 ${toggle && !checked ? "opacity-50 pointer-events-none" : "opacity-100"}`, children })
  ] });
};
const FolderOpenIcon = ({ className, size }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" }) });
const Share2Icon = ({ size }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "5", r: "3" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "12", r: "3" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "19", r: "3" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" })
] });
const ExternalLinkIcon = ({ size }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })
] });
const AdDetailsPanel = ({ isOpen, ad, onClose }) => {
  const [platform, setPlatform] = reactExports.useState("facebook");
  if (!isOpen || !ad) return null;
  const creative = ad.creative || {
    type: "image",
    primaryText: "",
    headline: ad.name,
    cta: "Learn More",
    imageUrl: ""
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#F0F2F5] shadow-2xl z-[70] transform transition-transform duration-300 translate-x-0 flex flex-col border-l border-gray-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 bg-white border-b border-gray-300 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[18px] font-bold text-[#1C1E21] leading-normal", children: "Ad Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[12px] text-gray-500 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium mr-2", children: [
              "ID: ",
              ad.id,
              "29384"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center ${ad.delivery === "Active" ? "text-green-600" : "text-gray-500"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full mr-1.5 ${ad.delivery === "Active" ? "bg-green-500" : "bg-gray-400"}` }),
              ad.delivery
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-300 px-6 py-2 flex justify-center space-x-4 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setPlatform("facebook"),
            className: `flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${platform === "facebook" ? "bg-blue-50 text-[#1877F2]" : "text-gray-500 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold mr-2", children: "f" }),
              "Facebook"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setPlatform("instagram"),
            className: `flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${platform === "instagram" ? "bg-pink-50 text-[#E1306C]" : "text-gray-500 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", className: "w-3 h-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
              ] }) }),
              "Instagram"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[400px] mx-auto space-y-6", children: [
        platform === "facebook" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FacebookPreview, { ad, creative }) : /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramPreview, { ad, creative }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-300 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[15px] font-bold text-[#1C1E21] mb-4 flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "mr-2 text-gray-500" }),
            " Performance Snapshot"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-3 rounded-lg border border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 mb-1", children: "Results" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-bold text-[#1C1E21]", children: ad.results })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-3 rounded-lg border border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 mb-1", children: "Cost per result" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-bold text-[#1C1E21]", children: ad.costPerResult })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-3 rounded-lg border border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 mb-1", children: "Quality Ranking" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-bold text-[#1C1E21]", children: ad.qualityRanking })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-3 rounded-lg border border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 mb-1", children: "Amount Spent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-bold text-[#1C1E21]", children: ad.amountSpent })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 bg-white border-t border-gray-300 shrink-0 flex justify-end space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-[#1C1E21] hover:bg-gray-50 transition-colors",
            onClick: onClose,
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] rounded-md text-[14px] font-bold text-white flex items-center shadow-sm transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 16, className: "mr-2" }),
          " View Charts"
        ] })
      ] })
    ] })
  ] });
};
const FacebookPreview = ({ ad, creative }) => {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex-shrink-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://ui-avatars.com/api/?name=Acme+Corp&background=random&color=fff&background=1877F2`, alt: "Logo", className: "w-full h-full" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-bold text-[#1C1E21] leading-none", children: "Acme Corp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] text-gray-500 mt-0.5 flex items-center", children: [
            "Sponsored ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 10, className: "ml-1" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 20, className: "text-gray-500" })
    ] }),
    creative.primaryText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 text-[14px] text-[#1C1E21] whitespace-pre-wrap leading-snug", children: creative.primaryText }),
    creative.type === "carousel" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto pb-4 px-2 space-x-2 snap-x hide-scrollbar", children: (_a = creative.carouselCards) == null ? void 0 : _a.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[240px] w-[240px] snap-center border border-gray-200 rounded-lg overflow-hidden shrink-0 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-gray-100 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.imageUrl, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-[#F0F2F5] min-h-[90px] flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-gray-500 uppercase tracking-wide", children: "example.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] font-bold text-[#1C1E21] leading-normal mt-0.5 truncate", children: card.headline }),
        card.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-gray-500 mt-0.5", children: card.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-3 w-full py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-[13px] font-bold text-[#1C1E21]", children: creative.cta || "Shop Now" })
      ] })
    ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-black min-h-[250px] relative flex items-center justify-center overflow-hidden", children: creative.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: creative.imageUrl, className: "w-full h-auto object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/80 hover:scale-105 transition-transform cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 32, className: "text-white fill-current ml-1" }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: creative.imageUrl || "https://placehold.co/600x400?text=No+Image", alt: "Ad Creative", className: "w-full h-auto object-cover" }) }),
    creative.type !== "carousel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F0F2F5] p-3 flex justify-between items-center border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pr-4 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-gray-500 uppercase font-medium", children: "example.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[16px] font-bold text-[#1C1E21] leading-normal mt-0.5 truncate", children: creative.headline || ad.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-4 py-2 bg-gray-300/50 hover:bg-gray-300 rounded text-[14px] font-bold text-[#1C1E21] whitespace-nowrap transition-colors", children: creative.cta || "Learn More" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1 flex justify-between items-center border-t border-gray-100 text-gray-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { size: 18, className: "mr-2" }),
        " Like"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18, className: "mr-2" }),
        " Comment"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 18, className: "mr-2" }),
        " Share"
      ] })
    ] })
  ] });
};
const InstagramPreview = ({ ad, creative }) => {
  var _a, _b;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px] flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-white p-[1.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://ui-avatars.com/api/?name=Acme+Corp&background=random&color=fff&background=1877F2`, alt: "Logo", className: "w-full h-full rounded-full" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-bold text-[#262626] leading-none", children: "acmecorp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-[#262626] mt-0.5", children: "Sponsored" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 20, className: "text-[#262626]" })
    ] }),
    creative.type === "carousel" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto snap-x hide-scrollbar", children: (_a = creative.carouselCards) == null ? void 0 : _a.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-full snap-center relative aspect-square", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: card.imageUrl, className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm", children: [
          idx + 1,
          "/",
          creative.carouselCards.length
        ] })
      ] }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2 space-x-1", children: (_b = creative.carouselCards) == null ? void 0 : _b.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#0095f6]" : "bg-gray-300"}` }, i)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square bg-gray-100 relative flex items-center justify-center overflow-hidden", children: creative.type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: creative.imageUrl, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 24, className: "text-white fill-current ml-1" }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: creative.imageUrl || "https://placehold.co/600x600?text=No+Image", alt: "Ad Creative", className: "w-full h-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#EBF5FF] px-4 py-2.5 flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-[#0095f6]", children: creative.cta || (creative.type === "carousel" ? "Shop Now" : "Learn More") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0095f6]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 24, className: "text-[#262626]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 24, className: "text-[#262626] -rotate-90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 24, className: "text-[#262626]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { size: 24, className: "text-[#262626]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-bold text-[#262626] mb-1", children: "2,439 likes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] text-[#262626]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold mr-1", children: "acmecorp" }),
        creative.primaryText ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "leading-snug", children: [
          creative.primaryText.length > 80 ? creative.primaryText.substring(0, 80) + "..." : creative.primaryText,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "more" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Check out our latest collection!" })
      ] })
    ] })
  ] });
};
const ChevronRight = ({ size }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "9 18 15 12 9 6" }) });
const TopNavigation = ({
  draftCount,
  onDiscard,
  onPublish,
  onRefresh,
  isRefreshing
}) => {
  const [showAccountMenu, setShowAccountMenu] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[60px] bg-[#FFFFFF] border-b border-gray-300 flex items-center justify-between px-4 sticky top-0 z-40 shadow-sm shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[20px] font-medium text-[#1C1E21] mr-3", children: "Campaigns" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative",
          onClick: () => setShowAccountMenu(!showAccountMenu),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-[#F0F2F5] hover:bg-[#E4E6EB] cursor-pointer px-2 py-1.5 rounded-md transition-colors border border-transparent hover:border-gray-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-gray-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-2", children: "M" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-semibold text-[#1C1E21] mr-2", children: "Medestra Ad (608896791..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "text-gray-500" })
            ] }),
            showAccountMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-full left-0 mt-1 w-[280px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 text-xs font-bold text-gray-500 uppercase", children: "Select Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-gray-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-3", children: "M" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Medestra Ad" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "ml-auto text-blue-500" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-purple-600 rounded text-[10px] flex items-center justify-center font-bold text-white mr-3", children: "A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Acme Backup" })
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onRefresh,
          className: `p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-500 border border-gray-300 ${isRefreshing ? "animate-spin" : ""}`,
          title: "Refresh Data",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onDiscard,
          disabled: draftCount === 0,
          className: `flex items-center px-3 py-1.5 rounded-md text-[14px] font-semibold border transition-colors
            ${draftCount > 0 ? "bg-[#F0F2F5] hover:bg-[#E4E6EB] text-[#1C1E21] border-gray-300 cursor-pointer" : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"}
          `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 14, className: "mr-2" }),
            "Discard drafts"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onPublish,
          disabled: draftCount === 0,
          className: `flex items-center px-4 py-1.5 rounded-md text-[14px] font-bold shadow-sm transition-colors
            ${draftCount > 0 ? "bg-[#1877F2] hover:bg-[#166fe5] text-white cursor-pointer" : "bg-[#E4E6EB] text-gray-400 cursor-not-allowed"}
          `,
          children: draftCount > 0 ? `Review and publish (${draftCount})` : "Review and publish"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 20 }) })
    ] })
  ] });
};
const campaigns = [
  {
    id: "c1",
    name: "New Traffic Campaign - Q3 Promo",
    delivery: "Active",
    bidStrategy: "Lowest cost",
    budget: "$50.00 Daily",
    results: "4,320 Link Clicks",
    reach: "12,500",
    impressions: "15,400",
    costPerResult: "$0.42",
    amountSpent: "$1,814.40",
    ends: "Ongoing"
  },
  {
    id: "c2",
    name: "Brand Awareness - Spring Collection",
    delivery: "Learning",
    bidStrategy: "Lowest cost",
    budget: "$20.00 Daily",
    results: "15,200 Est. Ad Recall",
    reach: "45,000",
    impressions: "52,100",
    costPerResult: "$0.05",
    amountSpent: "$760.00",
    ends: "Dec 31, 2024"
  },
  {
    id: "c3",
    name: "Retargeting - Cart Abandoners",
    delivery: "Active",
    bidStrategy: "Cap",
    budget: "$150.00 Lifetime",
    results: "24 Purchases",
    reach: "3,200",
    impressions: "8,500",
    costPerResult: "$12.50",
    amountSpent: "$300.00",
    ends: "Nov 15, 2024"
  },
  {
    id: "c4",
    name: "Lead Gen - Webinar Signup",
    delivery: "Off",
    bidStrategy: "Lowest cost",
    budget: "$100.00 Daily",
    results: "85 Leads",
    reach: "8,000",
    impressions: "11,200",
    costPerResult: "$3.50",
    amountSpent: "$297.50",
    ends: "Ended"
  },
  {
    id: "c5",
    name: "App Install - iOS",
    delivery: "In Draft",
    bidStrategy: "Lowest cost",
    budget: "$75.00 Daily",
    results: "-",
    reach: "-",
    impressions: "-",
    costPerResult: "-",
    amountSpent: "-",
    ends: "Not Started"
  }
];
const adSets = [
  {
    id: "as1",
    name: "US - 18-65+ - Interests: Tech",
    delivery: "Active",
    budget: "$25.00 Daily",
    schedule: "Ongoing",
    results: "2,100 Link Clicks",
    reach: "6,200",
    impressions: "7,500",
    costPerResult: "$0.45",
    amountSpent: "$945.00",
    ends: "Ongoing"
  },
  {
    id: "as2",
    name: "UK - 25-45 - Lookalike 1%",
    delivery: "Active",
    budget: "$25.00 Daily",
    schedule: "Ongoing",
    results: "2,220 Link Clicks",
    reach: "6,300",
    impressions: "7,900",
    costPerResult: "$0.39",
    amountSpent: "$869.40",
    ends: "Ongoing"
  },
  {
    id: "as3",
    name: "Retargeting - Website Visitors 30d",
    delivery: "Learning",
    budget: "$150.00 Lifetime",
    schedule: "Ends Nov 15",
    results: "24 Purchases",
    reach: "3,200",
    impressions: "8,500",
    costPerResult: "$12.50",
    amountSpent: "$300.00",
    ends: "Nov 15, 2024"
  }
];
const ads = [
  {
    id: "a1",
    name: "Image 01 - Blue Background",
    delivery: "Active",
    qualityRanking: "Above Average",
    results: "1,500 Link Clicks",
    reach: "4,000",
    impressions: "5,000",
    costPerResult: "$0.40",
    amountSpent: "$600.00",
    ends: "Ongoing",
    creative: {
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
      primaryText: "Boost your team's productivity with our award-winning collaboration platform. Try it free for 14 days! 🚀",
      headline: "The Ultimate Collaboration Tool",
      cta: "Sign Up"
    }
  },
  {
    id: "a2",
    name: "Video 01 - Product Demo",
    delivery: "Active",
    qualityRanking: "Average",
    results: "600 Link Clicks",
    reach: "2,200",
    impressions: "2,500",
    costPerResult: "$0.58",
    amountSpent: "$345.00",
    ends: "Ongoing",
    creative: {
      type: "video",
      imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
      videoUrl: "#",
      primaryText: "See how it works in real-time. Seamless integration with your favorite tools.",
      headline: "Watch Demo: Integration Flow",
      cta: "Watch More"
    }
  },
  {
    id: "a3",
    name: "Carousel - Best Sellers",
    delivery: "Review",
    qualityRanking: "-",
    results: "-",
    reach: "-",
    impressions: "-",
    costPerResult: "-",
    amountSpent: "-",
    ends: "Ongoing",
    creative: {
      type: "carousel",
      primaryText: "Our best sellers are back in stock. Grab them before they are gone!",
      headline: "Spring Collection Highlights",
      cta: "Shop Now",
      carouselCards: [
        {
          imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
          headline: "Classic Tee",
          description: "$29.99"
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
          headline: "Urban Jacket",
          description: "$89.99"
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
          headline: "Summer Hat",
          description: "$24.99"
        }
      ]
    }
  }
];
const Dashboard = () => {
  const [activeTab, setActiveTab] = reactExports.useState("Campaigns");
  const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedAd, setSelectedAd] = reactExports.useState(null);
  const [editData, setEditData] = reactExports.useState(null);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [dateRange, setDateRange] = reactExports.useState("This month");
  const [showDateMenu, setShowDateMenu] = reactExports.useState(false);
  const [showColumnMenu, setShowColumnMenu] = reactExports.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [visibleColumns, setVisibleColumns] = reactExports.useState({
    budget: true,
    bidStrategy: true,
    qualityRanking: true,
    results: true,
    reach: true,
    impressions: true,
    costPerResult: true,
    amountSpent: true,
    ends: true
  });
  const [campaigns$1, setCampaigns] = reactExports.useState(campaigns);
  const [adSets$1, setAdSets] = reactExports.useState(adSets);
  const [ads$1, setAds] = reactExports.useState(ads);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [draftCount, setDraftCount] = reactExports.useState(0);
  const currentData = reactExports.useMemo(() => {
    switch (activeTab) {
      case "Campaigns":
        return campaigns$1;
      case "Ad Sets":
        return adSets$1;
      case "Ads":
        return ads$1;
      default:
        return campaigns$1;
    }
  }, [activeTab, campaigns$1, adSets$1, ads$1]);
  const filteredData = reactExports.useMemo(() => {
    return currentData.filter(
      (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery)
    );
  }, [currentData, searchQuery]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedIds(/* @__PURE__ */ new Set());
    setSearchQuery("");
    setSelectedAd(null);
    setEditData(null);
  };
  const handleSelectionChange = (id) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(filteredData.map((item) => item.id)));
    } else {
      setSelectedIds(/* @__PURE__ */ new Set());
    }
  };
  const handleStatusToggle = (id) => {
    const toggleItem = (items, setItems) => {
      setItems(items.map((item) => {
        if (item.id === id) {
          setDraftCount((prev) => prev + 1);
          const newStatus = item.delivery === "Active" ? "Off" : "Active";
          return { ...item, delivery: newStatus };
        }
        return item;
      }));
    };
    if (activeTab === "Campaigns") toggleItem(campaigns$1, setCampaigns);
    if (activeTab === "Ad Sets") toggleItem(adSets$1, setAdSets);
    if (activeTab === "Ads") toggleItem(ads$1, setAds);
  };
  const handleDeleteClick = () => {
    if (selectedIds.size > 0) {
      setShowDeleteConfirm(true);
    }
  };
  const confirmDelete = () => {
    const idsToDelete = new Set(selectedIds);
    const filterFunc = (item) => !idsToDelete.has(item.id);
    if (activeTab === "Campaigns") setCampaigns((prev) => prev.filter(filterFunc));
    else if (activeTab === "Ad Sets") setAdSets((prev) => prev.filter(filterFunc));
    else setAds((prev) => prev.filter(filterFunc));
    setSelectedIds(/* @__PURE__ */ new Set());
    if (selectedAd && idsToDelete.has(selectedAd.id)) setSelectedAd(null);
    setDraftCount((prev) => prev + 1);
    setShowDeleteConfirm(false);
  };
  const handleDuplicate = () => {
    const idsToDup = Array.from(selectedIds);
    if (idsToDup.length === 0) return;
    const dupItem = (items, setItems) => {
      const newItems = [];
      items.forEach((item) => {
        if (selectedIds.has(item.id)) {
          const copy = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            name: `${item.name} - Copy`,
            delivery: "In Draft"
          };
          newItems.push(copy);
        }
      });
      if (newItems.length > 0) {
        setItems([...newItems, ...items]);
        setDraftCount((prev) => prev + newItems.length);
        alert(`Duplicated ${newItems.length} items.`);
      }
    };
    if (activeTab === "Campaigns") dupItem(campaigns$1, setCampaigns);
    else if (activeTab === "Ad Sets") dupItem(adSets$1, setAdSets);
    else dupItem(ads$1, setAds);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const handleExport = () => {
    if (filteredData.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = Object.keys(filteredData[0]).join(",");
    const rows = filteredData.map(
      (obj) => Object.values(obj).map(
        (val) => typeof val === "string" && val.includes(",") ? `"${val}"` : val
      ).join(",")
    ).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab.toLowerCase()}_export_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDateSelect = (range) => {
    setDateRange(range);
    setShowDateMenu(false);
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };
  const handleEdit = () => {
    if (selectedIds.size !== 1) return;
    const id = Array.from(selectedIds)[0];
    const item = currentData.find((i) => i.id === id);
    if (item) {
      setEditData(item);
      setIsCreateModalOpen(true);
    }
  };
  const handleSave = (result) => {
    if (editData) {
      const updater = (item) => {
        if (item.id === editData.id) {
          return { ...item, ...result, id: item.id };
        }
        return item;
      };
      if (activeTab === "Campaigns") setCampaigns((prev) => prev.map(updater));
      else if (activeTab === "Ad Sets") setAdSets((prev) => prev.map(updater));
      else setAds((prev) => prev.map(updater));
    } else {
      const newItem = {
        ...result,
        id: Math.random().toString(36).substr(2, 9),
        delivery: "In Draft",
        results: "0",
        reach: "0",
        impressions: "0",
        costPerResult: "-",
        amountSpent: "$0.00",
        ends: "Ongoing"
      };
      if (activeTab === "Campaigns") setCampaigns([newItem, ...campaigns$1]);
      else if (activeTab === "Ad Sets") setAdSets([{ ...newItem, schedule: "Ongoing" }, ...adSets$1]);
      else setAds([{ ...newItem, qualityRanking: "-" }, ...ads$1]);
    }
    setDraftCount((prev) => prev + 1);
    setIsCreateModalOpen(false);
    setEditData(null);
  };
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditData(null);
  };
  const handleDiscard = () => {
    if (confirm("Discard all draft changes? This will revert the data to its original state.")) {
      setCampaigns(campaigns);
      setAdSets(adSets);
      setAds(ads);
      setDraftCount(0);
    }
  };
  const handlePublish = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setDraftCount(0);
      const activator = (items) => items.map((i) => i.delivery === "In Draft" ? { ...i, delivery: "Active" } : i);
      setCampaigns((prev) => activator(prev));
      setAdSets((prev) => activator(prev));
      setAds((prev) => activator(prev));
      alert("Items published successfully!");
    }, 1500);
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-[#F0F2F5]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TopNavigation,
      {
        draftCount,
        onDiscard: handleDiscard,
        onPublish: handlePublish,
        onRefresh: handleRefresh,
        isRefreshing
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-300 px-4 py-2 flex items-center space-x-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-[14px] font-semibold text-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 16, className: "mr-2 text-[#1877F2]" }),
          " All ads"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-[14px] font-semibold text-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 16, className: "mr-2" }),
          " Actions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 text-gray-400", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Search to filter by name, ID or metrics",
            className: "w-full pl-9 pr-4 py-2 text-[14px] border-none bg-transparent focus:ring-0 placeholder-gray-400 outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-[14px] font-medium text-gray-500 hover:text-gray-700 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mr-1" }),
        " See more"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-end md:items-center justify-between px-2 pt-2 border-b border-gray-200 bg-[#F0F2F5]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-1 pl-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabButton,
          {
            label: "Campaigns",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 16 }),
            isActive: activeTab === "Campaigns",
            onClick: () => handleTabChange("Campaigns")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabButton,
          {
            label: "Ad sets",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 16 }),
            isActive: activeTab === "Ad Sets",
            onClick: () => handleTabChange("Ad Sets")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabButton,
          {
            label: "Ads",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
            isActive: activeTab === "Ads",
            onClick: () => handleTabChange("Ads")
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 mr-2 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-gray-50 shadow-sm min-w-[200px] justify-between",
            onClick: () => setShowDateMenu(!showDateMenu),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "mr-2 text-gray-500" }),
                dateRange === "This month" ? "This month: Feb 1 – Feb 28" : dateRange
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "ml-2 text-gray-500" })
            ]
          }
        ),
        showDateMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full mt-1 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 text-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 text-gray-400 font-bold uppercase text-[11px]", children: "Presets" }),
          ["Today", "Yesterday", "Last 7 days", "Last 14 days", "This month", "Last month", "Lifetime"].map((range) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between",
              onClick: () => handleDateSelect(range),
              children: [
                range,
                dateRange === range && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "text-[#1877F2]" })
              ]
            },
            range
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-300 p-2 flex items-center justify-between shadow-sm z-10 sticky top-0 overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "bg-[#31A24C] hover:bg-[#2b8a42] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-bold flex items-center transition-colors shadow-sm",
            onClick: () => setIsCreateModalOpen(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18, className: "mr-1.5 stroke-[3]" }),
              " Create"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-gray-300 mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 16 }),
              label: "Duplicate",
              disabled: selectedIds.size === 0,
              onClick: handleDuplicate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 16 }),
              label: "Edit",
              disabled: selectedIds.size !== 1,
              onClick: handleEdit
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-px bg-gray-300 mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[14px] font-bold flex items-center transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { size: 16, className: "mr-2" }),
          " A/B test"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-2 py-1.5 text-gray-600 hover:bg-gray-100 rounded flex items-center font-semibold text-[13px]", children: [
          "More ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "ml-1" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `p-1.5 text-gray-600 rounded hover:bg-gray-100 transition-colors ${selectedIds.size > 0 ? "hover:text-red-600" : "opacity-50 cursor-not-allowed"}`,
            disabled: selectedIds.size === 0,
            onClick: handleDeleteClick,
            title: "Delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[13px] font-bold flex items-center",
              onClick: () => setShowColumnMenu(!showColumnMenu),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 14 }) }),
                " Columns ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12, className: "ml-1" })
              ]
            }
          ),
          showColumnMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full mt-1 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-2 text-[13px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1.5 font-bold text-gray-500 border-b border-gray-100 mb-1", children: "Customize Columns" }),
            Object.keys(visibleColumns).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-3 py-1.5 hover:bg-gray-50 cursor-pointer flex items-center",
                onClick: () => setVisibleColumns({ ...visibleColumns, [key]: !visibleColumns[key] }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: visibleColumns[key], readOnly: true, className: "mr-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: key.replace(/([A-Z])/g, " $1").trim() })
                ]
              },
              key
            ))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[13px] font-bold flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { size: 14 }) }),
          " Breakdown ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 12, className: "ml-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-gray-300 rounded-[4px] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300", title: "Reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300",
              title: "Export CSV",
              onClick: handleExport,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-1.5 bg-white hover:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { size: 14 }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex-1 bg-white flex flex-col overflow-hidden relative ${isRefreshing ? "opacity-50 pointer-events-none" : "opacity-100 transition-opacity"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CampaignTable,
        {
          data: filteredData,
          activeTab,
          selectedIds,
          visibleColumns,
          onToggleSelect: handleSelectionChange,
          onToggleSelectAll: handleSelectAll,
          onStatusChange: handleStatusToggle,
          onAdClick: setSelectedAd
        }
      ),
      isRefreshing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateModal,
      {
        isOpen: isCreateModalOpen,
        onClose: handleCloseModal,
        onCreate: handleSave,
        initialData: editData,
        context: activeTab
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdDetailsPanel,
      {
        isOpen: !!selectedAd,
        ad: selectedAd,
        onClose: () => setSelectedAd(null)
      }
    ),
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-[440px] overflow-hidden animate-scale-up border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-[#F0F2F5]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[16px] font-bold text-[#1C1E21]", children: [
          "Delete ",
          selectedIds.size,
          " ",
          selectedIds.size === 1 ? "item" : "items",
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowDeleteConfirm(false), className: "text-gray-500 hover:bg-gray-200 rounded-full p-1 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] text-gray-700 leading-relaxed", children: [
        "Are you sure you want to delete the selected ",
        activeTab.toLowerCase(),
        "? This action cannot be undone."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-gray-200 flex justify-end space-x-3 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowDeleteConfirm(false),
            className: "px-4 py-2 rounded-md font-bold text-[#1C1E21] hover:bg-[#F0F2F5] text-[14px] transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: confirmDelete,
            className: "px-6 py-2 rounded-md font-bold text-white bg-[#E60023] hover:bg-[#ad0c20] text-[14px] transition-colors shadow-sm",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
};
const TabButton = ({ label, icon, isActive, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "div",
  {
    onClick,
    className: `
            px-4 py-2 cursor-pointer flex items-center space-x-2 rounded-t-md border-t border-l border-r
            ${isActive ? "bg-white border-gray-300 border-b-white text-[#1877F2]" : "bg-transparent border-transparent text-[#65676B] hover:bg-gray-200/50"}
        `,
    style: { marginBottom: "-1px", zIndex: isActive ? 10 : 0 },
    children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[14px] font-bold ${isActive ? "text-[#1C1E21]" : "text-[#65676B]"}`, children: label })
    ]
  }
);
const ActionButton = ({ icon, label, disabled, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "button",
  {
    className: `
            px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-[4px] text-[14px] font-bold flex items-center transition-colors
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50"}
        `,
    disabled,
    onClick,
    children: [
      React.cloneElement(icon, { size: 16, className: "mr-1.5" }),
      " ",
      label
    ]
  }
);
const MetaAdsManagerPage = () => {
  const [activeTool, setActiveTool] = reactExports.useState("Campaigns");
  return (
    // Enforcing LTR direction for the Simulator regardless of the app's language.
    // If you want to support RTL in the future, remove the dir="ltr" attribute below.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 font-sans text-gray-900", dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex pt-[80px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { activeTool, setActiveTool }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 ml-[60px] flex flex-col min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-hidden h-screen relative", children: activeTool === "Campaigns" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-full text-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Simulated Page" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 mb-6", children: [
            "The ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: activeTool }),
            " tool is not fully implemented in this simulator demo. Please return to the Campaigns tab to explore the core functionality."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveTool("Campaigns"),
              className: "px-6 py-2 bg-[#1877F2] text-white rounded-md font-medium hover:bg-blue-600 transition-colors",
              children: "Go to Campaigns"
            }
          )
        ] }) }) }) })
      ] })
    ] })
  );
};
export {
  MetaAdsManagerPage as default
};
