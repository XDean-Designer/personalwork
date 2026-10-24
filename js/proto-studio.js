/**
 * Proto Studio — project rail + external scene nav + phone iframe + QR
 */
(function () {
  const FIGMA_FILE =
    "https://www.figma.com/design/3wJ8PuZfs3uPjzxIvgBjDK/%F0%9F%8E%89Dean-work";

  const PROJECTS = [
    {
      id: "billing",
      num: "01",
      title: "开单结账",
      subtitle: "高保真原型",
      blurb: "散客/会员开单、结算与员工指定等主链路，手机框内仅展示机内页面。",
      guide: "首屏请点「开单」或「挂单」；其余区域无热区。",
      tags: ["B端", "SaaS", "开单"],
      path: "/H5原型/开单结账/index.html",
      prd: "/H5原型/开单结账/PRD-开单结账.html",
      embedQuery: "mobile=1&studio=1",
      /* 全屏/扫码：不强制 query，走原型 UA / 视口识别 */
      phoneQuery: "",
      figma: `${FIGMA_FILE}?node-id=62-493`,
      figmaLabel: "Figma · 开单流程",
      scenes: [
        { group: "主链路", label: "0 首页", msg: { kind: "go", target: "s0" } },
        { group: "主链路", label: "4 选择顾客", msg: { kind: "go", target: "s4" } },
        { group: "主链路", label: "1 开单（散客）", msg: { kind: "go", target: "s1" } },
        { group: "主链路", label: "5 开单（会员）", msg: { kind: "go", target: "s5" } },
        { group: "主链路", label: "6 开单结算", msg: { kind: "go", target: "s6" } },
        { group: "主链路", label: "15 开单成功", msg: { kind: "go", target: "s15" } },
        { group: "直接收款", label: "2 直接收款", msg: { kind: "go", target: "s2" } },
        { group: "直接收款", label: "3 收款", msg: { kind: "go", target: "s3" } },
        { group: "直接收款", label: "7 开单结算", msg: { kind: "click", selector: '.nav-item[data-target="s7"]' } },
        { group: "逻辑补充", label: "8 门店流水", msg: { kind: "go", target: "s8" } },
        { group: "逻辑补充", label: "9 选择退款项目", msg: { kind: "go", target: "s9" } },
        { group: "逻辑补充", label: "12 选择权益", msg: { kind: "click", selector: '.nav-item[onclick*="openBenPickSheet"]' } },
        { group: "逻辑补充", label: "13 选择优惠券", msg: { kind: "click", selector: '.nav-item[onclick*="openCouponPickSheet"]' } },
        { group: "逻辑补充", label: "14 挂单列表", msg: { kind: "click", selector: '.nav-item[data-target="s14"]' } },
      ],
    },
    {
      id: "selfpay",
      num: "02",
      title: "归档自助订单",
      subtitle: "高保真原型",
      blurb: "自助订单归档与补全流程；分配模式等演示开关在外侧场景栏切换。",
      guide:
        "PC 操作：在「待归档订单」横条上按住 Shift + 鼠标滚轮右滑订单流，滑入自助订单列表；也可用右侧场景栏「16 自助订单」。",
      tags: ["B端", "自助", "归档"],
      path: "/H5原型/kaidan2/index.html",
      prd: "/H5原型/kaidan2/PRD-自助订单归档.html",
      embedQuery: "mobile=1&studio=1",
      phoneQuery: "",
      figma: `${FIGMA_FILE}?node-id=62-493`,
      figmaLabel: "Figma · 开单流程",
      scenes: [
        { group: "自助归档", label: "0 首页", msg: { kind: "go", target: "s0" } },
        { group: "自助归档", label: "16 自助订单", msg: { kind: "go", target: "s16" } },
        { group: "自助归档", label: "17 补全订单", msg: { kind: "click", selector: '.nav-item[data-target="s17"]' } },
        { group: "分配模式", label: "按工位", msg: { kind: "fn", path: "SelfPay.setAllocMode", args: ["station"] } },
        { group: "分配模式", label: "平均分配", msg: { kind: "fn", path: "SelfPay.setAllocMode", args: ["average"] } },
        { group: "进列表手势", label: "圆点版", msg: { kind: "fn", path: "SelfPay.setFloorMode", args: ["dots"] } },
        { group: "进列表手势", label: "文案版", msg: { kind: "fn", path: "SelfPay.setFloorMode", args: ["hint"] } },
        { group: "数值条样式", label: "分立", msg: { kind: "fn", path: "SelfPay.setIbarStyle", args: ["separate"] } },
        { group: "数值条样式", label: "贴边块", msg: { kind: "fn", path: "SelfPay.setIbarStyle", args: ["stack"] } },
      ],
    },
    {
      id: "commission",
      num: "03",
      title: "提成设置与员工管理",
      subtitle: "高保真原型",
      blurb: "提成方案、员工管理与薪资相关页面，外侧场景栏对应原左侧导航。",
      guide: "首屏三张卡片分别进入「提成设置」「员工管理」「员工薪资」。",
      tags: ["B端", "提成", "员工"],
      path: "/H5原型/ticheng/index.html",
      prd: "/H5原型/ticheng/PRD-提成设置.html",
      embedQuery: "view=mobile&studio=1",
      phoneQuery: "",
      figma: `${FIGMA_FILE}?node-id=62-494`,
      figmaLabel: "Figma · 业绩设置",
      scenes: [
        { group: "入口", label: "功能入口", msg: { kind: "flow", flow: "hub" } },
        { group: "提成设置", label: "1 方案列表", msg: { kind: "flow", flow: "comm2-list" } },
        { group: "提成设置", label: "2 编辑方案", msg: { kind: "flow", flow: "comm2-edit" } },
        { group: "提成设置", label: "3 添加规则项", msg: { kind: "flow", flow: "comm2-pick" } },
        { group: "员工管理", label: "1 员工列表", msg: { kind: "flow", flow: "staff-list" } },
        { group: "员工管理", label: "2 头衔管理", msg: { kind: "flow", flow: "staff-roles" } },
        { group: "员工管理", label: "3 角色管理", msg: { kind: "flow", flow: "staff-role-perms" } },
        { group: "员工管理", label: "4 员工详情", msg: { kind: "flow", flow: "staff-detail" } },
        { group: "员工管理", label: "5 创建员工", msg: { kind: "flow", flow: "staff-create" } },
        { group: "员工薪资", label: "1 员工薪资", msg: { kind: "flow", flow: "staff-salary" } },
        { group: "员工薪资", label: "2 薪资明细", msg: { kind: "flow", flow: "staff-pay-detail" } },
        { group: "员工薪资", label: "3 结算周期", msg: { kind: "flow", flow: "staff-pay-cycle" } },
        { group: "员工薪资", label: "4 业绩提成明细", msg: { kind: "flow", flow: "staff-salary-detail" } },
        { group: "员工薪资", label: "5 设奖惩", msg: { kind: "flow", flow: "staff-rewards" } },
      ],
    },
    {
      id: "groupbuy",
      num: "04",
      title: "团购核销",
      subtitle: "高保真原型",
      blurb: "抖音 / 美团团购核销双端流程，外侧场景栏切换店员与店长关键页。",
      guide: "首屏纵列三卡：点「账号管理」「工作台」或「扫码核销」进入对应流程。",
      tags: ["B端", "团购", "核销"],
      path: "/H5原型/tiktok/index.html",
      prd: "/H5原型/tiktok/PRD-团购核销.html",
      embedQuery: "view=mobile&studio=1",
      phoneQuery: "",
      figma: `${FIGMA_FILE}?node-id=64-63065`,
      figmaLabel: "Figma · 团购核销",
      scenes: [
        { group: "入口", label: "1 功能入口", msg: { kind: "flow", flow: "home" } },
        { group: "入口", label: "1a 工作台", msg: { kind: "flow", flow: "workbench" } },
        { group: "入口", label: "1a+ 订单流水", msg: { kind: "flow", flow: "order-flow" } },
        { group: "入口", label: "1c 团购设置", msg: { kind: "flow", flow: "tg-set" } },
        { group: "入口", label: "1d 目录列表", msg: { kind: "flow", flow: "tg-deals" } },
        { group: "入口", label: "1b 账号管理", msg: { kind: "flow", flow: "account" } },
        { group: "核销", label: "2 扫码核销", msg: { kind: "flow", flow: "scan" } },
        { group: "核销", label: "3 输码验券", msg: { kind: "flow", flow: "input" } },
        { group: "核销", label: "4 验券结果", msg: { kind: "flow", flow: "result" } },
        { group: "核销", label: "5 核销确认", msg: { kind: "flow", flow: "confirm" } },
        { group: "核销", label: "6 核销成功", msg: { kind: "flow", flow: "success" } },
        { group: "明细", label: "7 核销明细", msg: { kind: "flow", flow: "orders" } },
        { group: "明细", label: "8 订单详情", msg: { kind: "flow", flow: "detail" } },
      ],
    },
  ];

  window.PROTO_STUDIO_PROJECTS = PROJECTS;
  window.PROTO_STUDIO_FIGMA_PAGES = [
    { name: "价目表", node: "62-492" },
    { name: "开单流程", node: "62-493" },
    { name: "业绩设置", node: "62-494" },
    { name: "员工管理", node: "62-495" },
    { name: "团购核销", node: "64-63065" },
    { name: "RTP 店主端", node: "0-1" },
    { name: "RTP 供应商端", node: "1-6387" },
    { name: "AI 助手", node: "1-11825" },
    { name: "答题 · 业绩排行", node: "1-12568" },
    { name: "RTS 裂店", node: "1-14410" },
    { name: "RTA 首页", node: "2-6981" },
    { name: "APP 动画", node: "2-4845" },
    { name: "RTP 商城", node: "2-4114" },
  ].map((p) => ({
    ...p,
    href: `${FIGMA_FILE}?node-id=${p.node}`,
  }));

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function absUrl(path, query) {
    const base = `${location.origin}${path}`;
    return query ? `${base}?${query}` : base;
  }

  function postToFrame(frame, msg) {
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage({ source: "proto-studio", ...msg }, "*");
  }

  function renderScenes(host, project, frame, opts) {
    host.innerHTML = "";
    host.appendChild(el("div", "proto-scene-label", "Scenes"));
    let lastGroup = null;
    project.scenes.forEach((scene, idx) => {
      if (scene.group !== lastGroup) {
        lastGroup = scene.group;
        host.appendChild(el("div", "proto-scene-group", scene.group));
      }
      const btn = el("button", "proto-scene-item");
      btn.type = "button";
      btn.textContent = scene.label;
      if (idx === 0) btn.classList.add("is-active");
      btn.addEventListener("click", () => {
        host.querySelectorAll(".proto-scene-item").forEach((n) => n.classList.remove("is-active"));
        btn.classList.add("is-active");
        if (opts && typeof opts.onScene === "function") {
          opts.onScene(scene);
          return;
        }
        postToFrame(frame, scene.msg);
      });
      host.appendChild(btn);
    });
  }

  function renderQr(host, url) {
    host.innerHTML = "";
    const title = el("div", "proto-qr-title", "手机扫码预览");
    const box = el("div", "proto-qr-box");
    const tip = el("p", "proto-qr-tip", "扫码后在手机浏览器进入预览模式");
    const link = el("a", "proto-qr-url", url);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    host.append(title, box, tip, link);

    if (typeof QRCode === "function") {
      try {
        // eslint-disable-next-line no-new
        new QRCode(box, {
          text: url,
          width: 132,
          height: 132,
          colorDark: "#0a0a0a",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M,
        });
        if (box.querySelector("canvas, img")) return;
      } catch (err) {
        box.innerHTML = "";
      }
    }
    const img = document.createElement("img");
    img.alt = "二维码";
    img.width = 132;
    img.height = 132;
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=132x132&margin=6&data=" +
      encodeURIComponent(url);
    box.appendChild(img);
  }

  function renderMeta(host, project, demoUrl, opts) {
    host.innerHTML = "";
    host.appendChild(el("div", "proto-meta-kicker", project.subtitle));
    host.appendChild(el("h2", "proto-meta-title", project.title));
    if (project.guide) {
      const tip = el("div", "proto-guide");
      tip.innerHTML =
        `<span class="proto-guide-label">操作引导</span>` +
        `<p class="proto-guide-text">${project.guide}</p>`;
      host.appendChild(tip);
    }
    host.appendChild(el("p", "proto-meta-blurb", project.blurb));
    const tags = el("div", "proto-meta-tags");
    project.tags.forEach((t) => tags.appendChild(el("span", "chip", t)));
    host.appendChild(tags);

    const actions = el("div", "proto-meta-actions");
    const openBtn = el("a", "btn btn-primary pressable", "全屏演示");
    openBtn.href = demoUrl;
    openBtn.target = "_blank";
    openBtn.rel = "noopener";
    openBtn.title = "按设备自动进入电脑浏览或手机模式";

    if (project.prd) {
      const prdBtn = el(
        "button",
        "btn btn-ghost pressable" + (opts && opts.prdActive ? " is-active" : ""),
        opts && opts.prdActive ? "返回原型" : "查看 PRD"
      );
      prdBtn.type = "button";
      prdBtn.addEventListener("click", () => {
        if (opts && typeof opts.onPrd === "function") opts.onPrd();
      });
      actions.append(openBtn, prdBtn);
    } else {
      actions.appendChild(openBtn);
    }

    const figBtn = el("a", "btn btn-ghost pressable", project.figmaLabel);
    figBtn.href = project.figma;
    figBtn.target = "_blank";
    figBtn.rel = "noopener";
    actions.appendChild(figBtn);
    host.appendChild(actions);

    const qr = el("div", "proto-qr");
    host.appendChild(qr);
    renderQr(qr, demoUrl);
  }

  function initStudio(root) {
    const rail = root.querySelector("[data-proto-rail]");
    const scenes = root.querySelector("[data-proto-scenes]");
    const frame = root.querySelector("[data-proto-frame]");
    const meta = root.querySelector("[data-proto-meta]");
    const stageLabel = root.querySelector("[data-proto-stage-label]");
    if (!rail || !scenes || !frame || !meta) return;

    let activeIndex = 0;
    let mode = "proto"; // proto | prd
    let pendingScene = null;

    rail.innerHTML = "";
    PROJECTS.forEach((project, index) => {
      const btn = el("button", "proto-rail-item");
      btn.type = "button";
      btn.dataset.id = project.id;
      btn.innerHTML =
        `<span class="proto-rail-num">${project.num}</span>` +
        `<span class="proto-rail-copy"><strong>${project.title}</strong><em>${project.subtitle}</em></span>`;
      btn.addEventListener("click", () => activate(index));
      rail.appendChild(btn);
    });

    function setCaption(project) {
      const caption = root.querySelector(".proto-stage-caption");
      if (!caption) return;
      if (mode === "prd") {
        caption.textContent = "PRD · 手机框内滚动阅读；点场景栏或「返回原型」切回";
        return;
      }
      caption.textContent = project.guide
        ? `引导 · ${project.guide}`
        : "PHONE STAGE · LIVE H5";
    }

    function loadProto(project, sceneMsg) {
      mode = "proto";
      root.dataset.mode = "proto";
      const embedUrl = absUrl(project.path, project.embedQuery);
      const needReload = frame.getAttribute("src") !== embedUrl;
      frame.setAttribute("title", project.title);
      pendingScene = sceneMsg || (project.scenes[0] && project.scenes[0].msg) || null;

      const onLoad = () => {
        if (pendingScene) postToFrame(frame, pendingScene);
        pendingScene = null;
        frame.removeEventListener("load", onLoad);
      };

      if (needReload) {
        frame.addEventListener("load", onLoad);
        frame.setAttribute("src", embedUrl);
      } else if (pendingScene) {
        postToFrame(frame, pendingScene);
        pendingScene = null;
      }
      setCaption(project);
    }

    function loadPrd(project) {
      if (!project.prd) return;
      mode = "prd";
      root.dataset.mode = "prd";
      const prdUrl = absUrl(project.prd);
      frame.setAttribute("title", project.title + " · PRD");
      if (frame.getAttribute("src") !== prdUrl) {
        frame.setAttribute("src", prdUrl);
      }
      setCaption(project);
      scenes.querySelectorAll(".proto-scene-item").forEach((n) => n.classList.remove("is-active"));
    }

    function refreshMeta(project) {
      const demoUrl = absUrl(project.path, project.phoneQuery || "");
      renderMeta(meta, project, demoUrl, {
        prdActive: mode === "prd",
        onPrd: () => {
          if (mode === "prd") {
            loadProto(project);
            refreshMeta(project);
            const first = scenes.querySelector(".proto-scene-item");
            if (first) first.classList.add("is-active");
            return;
          }
          loadPrd(project);
          refreshMeta(project);
        },
      });
    }

    function activate(index) {
      const project = PROJECTS[index];
      if (!project) return;
      activeIndex = index;
      mode = "proto";
      root.dataset.mode = "proto";
      [...rail.children].forEach((node, i) => {
        node.classList.toggle("is-active", i === index);
      });
      if (stageLabel) stageLabel.setAttribute("data-proto-stage-label", project.num);
      root.dataset.active = project.id;

      renderScenes(scenes, project, frame, {
        onScene: (scene) => {
          if (mode === "prd") {
            loadProto(project, scene.msg);
            refreshMeta(project);
            return;
          }
          postToFrame(frame, scene.msg);
        },
      });
      loadProto(project);
      refreshMeta(project);
    }

    const hashId = location.hash.replace(/^#/, "");
    const start = PROJECTS.findIndex((p) => p.id === hashId);
    activate(start < 0 ? 0 : start);
  }

  function initFigmaWall(root) {
    const grid = root.querySelector("[data-figma-wall]");
    if (!grid) return;
    grid.innerHTML = "";
    window.PROTO_STUDIO_FIGMA_PAGES.forEach((page, i) => {
      const a = el("a", "figma-wall-card pressable lift");
      a.href = page.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        `<span class="figma-wall-num">${String(i + 1).padStart(2, "0")}</span>` +
        `<strong>${page.name}</strong>` +
        `<span class="entry-go">打开设计稿 →</span>`;
      grid.appendChild(a);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-proto-studio]").forEach(initStudio);
    document.querySelectorAll("[data-figma-wall-root]").forEach(initFigmaWall);
  });
})();
