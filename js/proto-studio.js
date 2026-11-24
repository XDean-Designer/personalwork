/**
 * Proto Studio — project rail + external scene nav + phone iframe + QR
 */
(function () {
  const FIGMA_FILE =
    "https://www.figma.com/design/3wJ8PuZfs3uPjzxIvgBjDK/%F0%9F%8E%89Dean-work";

  const PROJECTS = [
    {
      id: "agent",
      num: "01",
      title: "AI Agent",
      subtitle: "高保真原型",
      blurb: "AI 对话窗（首页提醒 / 全屏），含价目、开单追问、卡管理与归档等演示。",
      guide: "首页点 Tab 中央 AI 进入全屏对话；外侧场景栏可切演示链路。",
      tags: ["B端", "AI", "对话"],
      path: "/H5原型/agent/agent-chat.html",
      prd: "/H5原型/agent/PRD-AI-Agent.html",
      embedQuery: "mobile=1&studio=1&v=20261124e",
      phoneQuery: "",
      figma: `${FIGMA_FILE}`,
      figmaLabel: "Figma · Dean work",
      scenes: [
        { group: "窗体", label: "1 首页 · 提醒", msg: { kind: "fn", path: "enterHome", args: [true] } },
        { group: "窗体", label: "2 全屏对话", msg: { kind: "fn", path: "setMode", args: ["fullscreen"] } },
        { group: "演示", label: "价目表", msg: { kind: "click", selector: "#navDemoPrice" } },
        { group: "演示", label: "开单（主）", msg: { kind: "click", selector: "#navDemoOrder" } },
        { group: "演示", label: "开单 · 三项", msg: { kind: "click", selector: "#navDemoOrderMulti" } },
        { group: "演示", label: "归档", msg: { kind: "click", selector: "#navDemoArchive" } },
        { group: "演示", label: "卡管理", msg: { kind: "click", selector: "#navDemoCards" } },
        { group: "演示", label: "思考 → 出结果", msg: { kind: "click", selector: "#navThink" } },
      ],
    },
    {
      id: "billing",
      num: "02",
      title: "开单结账",
      subtitle: "高保真原型",
      blurb: "散客/会员开单、结算与员工指定等主链路，手机框内仅展示机内页面。",
      guide: "首屏请点「开单」或「挂单」；其余区域无热区。",
      tags: ["B端", "SaaS", "开单"],
      path: "/H5原型/开单结账/index.html",
      prd: "/H5原型/开单结账/PRD-开单结账.html",
      embedQuery: "mobile=1&studio=1&v=20261124f",
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
      num: "03",
      title: "归档自助订单",
      subtitle: "高保真原型",
      blurb: "自助订单归档与补全流程；分配模式等演示开关在外侧场景栏切换。",
      guide:
        "PC 操作：在「待归档订单」横条上按住 Shift + 鼠标滚轮右滑订单流，滑入自助订单列表；也可用右侧场景栏「16 自助订单」。",
      tags: ["B端", "自助", "归档"],
      path: "/H5原型/kaidan2/index.html",
      prd: "/H5原型/kaidan2/PRD-自助订单归档.html",
      embedQuery: "mobile=1&studio=1&v=20261124f",
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
      num: "04",
      title: "提成设置与员工管理",
      subtitle: "高保真原型",
      blurb: "提成方案、员工管理与薪资相关页面，外侧场景栏对应原左侧导航。",
      guide: "首屏三张卡片分别进入「提成设置」「员工管理」「员工薪资」。",
      tags: ["B端", "提成", "员工"],
      path: "/H5原型/ticheng/index.html",
      prd: "/H5原型/ticheng/PRD-提成设置.html",
      embedQuery: "view=mobile&studio=1&v=20261117i",
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
      num: "05",
      title: "团购核销",
      subtitle: "高保真原型",
      blurb: "抖音 / 美团团购核销双端流程，外侧场景栏切换店员与店长关键页。",
      guide: "首屏纵列三卡：点「账号管理」「工作台」或「扫码核销」进入对应流程。",
      tags: ["B端", "团购", "核销"],
      path: "/H5原型/tiktok/index.html",
      prd: "/H5原型/tiktok/PRD-团购核销.html",
      embedQuery: "view=mobile&studio=1&v=20261117i",
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
    {
      id: "menu",
      num: "06",
      title: "价目表",
      subtitle: "高保真原型",
      blurb: "项目 / 产品价目、分组管理与新增编辑全链路；外侧场景栏覆盖列表与完整浮层态。",
      guide: "首屏可点「添加」、项目/产品 Tab、分组齿轮；长按可排序，左滑可操作。",
      tags: ["B端", "价目", "SaaS"],
      path: "/H5原型/menu/index.html",
      prd: "/H5原型/menu/PRD-项目创建与管理.html",
      embedQuery: "mobile=1&studio=1&v=20261117i",
      phoneQuery: "",
      figma: `${FIGMA_FILE}?node-id=62-492`,
      figmaLabel: "Figma · 价目表",
      scenes: [
        { group: "价目表", label: "2 价目表 · 项目", msg: { kind: "flow", flow: "price-list-filled" } },
        { group: "价目表", label: "1 价目表 · 空态", msg: { kind: "flow", flow: "price-list-empty" } },
        { group: "价目表", label: "3 价目表 · 产品", msg: { kind: "flow", flow: "price-list-product" } },
        { group: "价目表", label: "4 分组管理", msg: { kind: "flow", flow: "price-groups" } },
        { group: "价目表", label: "5 分组 · 包含项目", msg: { kind: "flow", flow: "price-group-members" } },
        { group: "价目表", label: "6 新增项目", msg: { kind: "flow", flow: "price-add" } },
        { group: "价目表", label: "7 新增产品", msg: { kind: "flow", flow: "price-add-product" } },
        { group: "价目表", label: "8 项目详情 · 普通", msg: { kind: "flow", flow: "price-edit-normal" } },
        { group: "价目表", label: "9 项目详情 · 绑卡", msg: { kind: "flow", flow: "price-edit-bound" } },
        { group: "价目表", label: "10 项目详情 · 下架", msg: { kind: "flow", flow: "price-edit-off-sale" } },
        { group: "价目表", label: "11 产品详情", msg: { kind: "flow", flow: "price-edit-product" } },
        { group: "价目表", label: "12 产品详情 · 下架", msg: { kind: "flow", flow: "price-edit-product-off-sale" } },
        { group: "浮层 / 叠加态", label: "行操作 Sheet", msg: { kind: "flow", flow: "price-list-action" } },
        { group: "浮层 / 叠加态", label: "左滑可删除", msg: { kind: "flow", flow: "price-list-swipe" } },
        { group: "浮层 / 叠加态", label: "左滑不可删除", msg: { kind: "flow", flow: "price-list-swipe-locked" } },
        { group: "浮层 / 叠加态", label: "已隐藏展开", msg: { kind: "flow", flow: "price-list-hidden-open" } },
        { group: "浮层 / 叠加态", label: "设置分组 Sheet", msg: { kind: "flow", flow: "price-item-group" } },
        { group: "浮层 / 叠加态", label: "设置分组 · 无组", msg: { kind: "flow", flow: "price-item-group-empty" } },
        { group: "浮层 / 叠加态", label: "分组行展开", msg: { kind: "flow", flow: "price-group-menu" } },
        { group: "浮层 / 叠加态", label: "分组行展开 · 产品", msg: { kind: "flow", flow: "price-group-menu-product" } },
        { group: "浮层 / 叠加态", label: "新建分组 Dialog", msg: { kind: "flow", flow: "price-group-create" } },
        { group: "浮层 / 叠加态", label: "重命名 Dialog", msg: { kind: "flow", flow: "price-group-rename" } },
        { group: "浮层 / 叠加态", label: "删除分组 Dialog", msg: { kind: "flow", flow: "price-group-delete" } },
        { group: "浮层 / 叠加态", label: "删除价目 Dialog", msg: { kind: "flow", flow: "price-item-delete" } },
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
    { name: "RTA 首页", node: "2-6981" },
    { name: "APP 动画", node: "2-4845" },
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

  const PUBLIC_ORIGIN = "https://www.deanxhome.cn";
  let phoneOriginCache = null;
  let phoneOriginPromise = null;

  function isLoopbackHost(host) {
    const h = String(host || "").replace(/:\d+$/, "").toLowerCase();
    return h === "localhost" || h === "127.0.0.1" || h === "[::1]" || h === "::1";
  }

  function absUrl(path, query, origin) {
    const baseOrigin = origin || location.origin;
    let href;
    try {
      const u = new URL(path, baseOrigin.endsWith("/") ? baseOrigin : baseOrigin + "/");
      if (query) {
        const q = new URLSearchParams(query);
        q.forEach((v, k) => u.searchParams.set(k, v));
      }
      href = u.href;
    } catch (err) {
      href = `${baseOrigin}${path}${query ? `?${query}` : ""}`;
    }
    return href;
  }

  /* 在候选私网 IP 里优先 Wi-Fi 常见段，避开 Hyper-V/Docker 等虚拟网卡 */
  function pickLanIpv4(ips) {
    const uniq = Array.from(
      new Set(
        (ips || []).filter((ip) => ip && !ip.startsWith("127.") && !ip.startsWith("169.254."))
      )
    );
    const score = (ip) => {
      if (ip.startsWith("192.168.")) return 100;
      if (ip.startsWith("10.")) return 60;
      /* 172.16–31 合法私网，但本机常混有虚拟交换机，分最低 */
      if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return 15;
      return 0;
    };
    uniq.sort((a, b) => score(b) - score(a));
    const best = uniq[0] || "";
    /* 只有虚拟段、没有 192.168/10 时宁可回落线上，避免手机扫到不可达地址 */
    if (best && score(best) < 60) return "";
    return best;
  }

  /* 手机扫码不能打回环地址：优先当前可公网/局域网 origin；本机则探测局域网 IP，失败回落线上域名 */
  function detectLanIpv4() {
    return new Promise((resolve) => {
      const RTC = window.RTCPeerConnection || window.webkitRTCPeerConnection;
      if (!RTC) {
        resolve("");
        return;
      }
      const found = [];
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        try {
          pc.close();
        } catch (e) {
          /* ignore */
        }
        resolve(pickLanIpv4(found));
      };
      const pc = new RTC({ iceServers: [] });
      try {
        pc.createDataChannel("lan");
      } catch (e) {
        /* ignore */
      }
      pc.onicecandidate = (ev) => {
        if (!ev || !ev.candidate) {
          if (ev && ev.candidate === null) finish();
          return;
        }
        const line = ev.candidate.candidate || "";
        const m = /([0-9]{1,3}(?:\.[0-9]{1,3}){3})/.exec(line);
        if (m && m[1] && !m[1].startsWith("127.")) found.push(m[1]);
      };
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .catch(() => finish());
      setTimeout(finish, 1600);
    });
  }

  function resolvePhoneOrigin() {
    if (phoneOriginCache) return Promise.resolve(phoneOriginCache);
    if (phoneOriginPromise) return phoneOriginPromise;
    phoneOriginPromise = (async () => {
      if (!isLoopbackHost(location.hostname)) {
        phoneOriginCache = location.origin;
        return phoneOriginCache;
      }
      const ip = await detectLanIpv4();
      if (ip) {
        phoneOriginCache = `${location.protocol}//${ip}${location.port ? `:${location.port}` : ""}`;
        return phoneOriginCache;
      }
      phoneOriginCache = PUBLIC_ORIGIN;
      return phoneOriginCache;
    })();
    return phoneOriginPromise;
  }

  function postToFrame(frame, msg) {
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage({ source: "proto-studio", ...msg }, "*");
  }

  const LOADER_MIN_MS = 280;

  function ensureStageLoader(bezel) {
    if (!bezel) return null;
    let loader = bezel.querySelector("[data-brand-loader]");
    if (loader) return loader;
    loader = el("div", "brand-loader");
    loader.setAttribute("data-brand-loader", "");
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML =
      `<div class="brand-loader-mark" aria-hidden="true">` +
      `<svg class="brand-loader-ring" viewBox="0 0 48 48" fill="none">` +
      `<circle class="brand-loader-track" cx="24" cy="24" r="18" />` +
      `<circle class="brand-loader-arc" cx="24" cy="24" r="18" />` +
      `</svg>` +
      `<span class="brand-loader-core">XD</span>` +
      `</div>` +
      `<div class="brand-loader-label">加载中</div>`;
    bezel.appendChild(loader);
    return loader;
  }

  function showStageLoader(bezel) {
    const loader = ensureStageLoader(bezel);
    if (!loader) return;
    loader.dataset.shownAt = String(Date.now());
    loader.classList.add("is-on");
    loader.setAttribute("aria-busy", "true");
    loader.setAttribute("aria-hidden", "false");
  }

  function hideStageLoader(bezel) {
    const loader = bezel && bezel.querySelector("[data-brand-loader]");
    if (!loader || !loader.classList.contains("is-on")) return;
    const shownAt = Number(loader.dataset.shownAt || 0);
    const wait = Math.max(0, LOADER_MIN_MS - (Date.now() - shownAt));
    window.setTimeout(() => {
      loader.classList.remove("is-on");
      loader.setAttribute("aria-busy", "false");
      loader.setAttribute("aria-hidden", "true");
    }, wait);
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

  function renderQr(host, url, tipText) {
    host.innerHTML = "";
    const title = el("div", "proto-qr-title", "手机扫码预览");
    const box = el("div", "proto-qr-box");
    const tip = el(
      "p",
      "proto-qr-tip",
      tipText || "扫码后在手机浏览器进入预览模式"
    );
    let display = url;
    try {
      display = decodeURI(url);
    } catch (e) {
      /* keep encoded */
    }
    const link = el("a", "proto-qr-url", display);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    host.append(title, box, tip, link);

    /* 二维码内容必须用百分号编码后的 URL，中文路径否则部分扫码器打不开 */
    const qrText = url;
    if (typeof QRCode === "function") {
      try {
        // eslint-disable-next-line no-new
        new QRCode(box, {
          text: qrText,
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
    img.referrerPolicy = "no-referrer";
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=132x132&margin=6&data=" +
      encodeURIComponent(qrText);
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
      const prdTab = el("a", "btn btn-ghost pressable proto-prd-newtab", "新窗口打开");
      prdTab.href = absUrl(project.prd);
      prdTab.target = "_blank";
      prdTab.rel = "noopener";
      prdTab.title = "在新窗口独占打开 PRD，便于长文档阅读";
      actions.appendChild(prdTab);
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
    const tipSeed = isLoopbackHost(location.hostname)
      ? "正在生成可被手机访问的地址…"
      : "扫码后在手机浏览器进入预览模式";
    renderQr(qr, demoUrl, tipSeed);
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

    function setCaption() {
      /* 手机框下方 caption 已移除；操作引导改由右侧 proto-meta 展示 */
    }

    function loadProto(project, sceneMsg) {
      mode = "proto";
      root.dataset.mode = "proto";
      const bezel = frame.closest(".proto-stage-bezel");
      const embedUrl = absUrl(project.path, project.embedQuery);
      const needReload = frame.getAttribute("src") !== embedUrl;
      frame.setAttribute("title", project.title);
      pendingScene = sceneMsg || (project.scenes[0] && project.scenes[0].msg) || null;

      const onLoad = () => {
        if (pendingScene) postToFrame(frame, pendingScene);
        pendingScene = null;
        hideStageLoader(bezel);
        frame.removeEventListener("load", onLoad);
      };

      if (needReload) {
        showStageLoader(bezel);
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
      const bezel = frame.closest(".proto-stage-bezel");
      const prdUrl = absUrl(project.prd);
      frame.setAttribute("title", project.title + " · PRD");
      if (frame.getAttribute("src") !== prdUrl) {
        showStageLoader(bezel);
        const onLoad = () => {
          hideStageLoader(bezel);
          frame.removeEventListener("load", onLoad);
        };
        frame.addEventListener("load", onLoad);
        frame.setAttribute("src", prdUrl);
      }
      setCaption(project);
      scenes.querySelectorAll(".proto-scene-item").forEach((n) => n.classList.remove("is-active"));
    }

    function refreshMeta(project) {
      const opts = {
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
      };
      /* 先用当前 origin 渲染；若是本机回环，异步换成局域网 / 线上可扫地址 */
      const provisional = absUrl(project.path, project.phoneQuery || "");
      renderMeta(meta, project, provisional, opts);
      resolvePhoneOrigin().then((origin) => {
        if (!meta.isConnected) return;
        const demoUrl = absUrl(project.path, project.phoneQuery || "", origin);
        renderMeta(meta, project, demoUrl, opts);
        const qr = meta.querySelector(".proto-qr");
        if (!qr) return;
        let tip = "扫码后在手机浏览器进入预览模式";
        if (isLoopbackHost(location.hostname)) {
          tip = origin.indexOf(PUBLIC_ORIGIN) === 0
            ? "本机未检测到局域网，二维码指向线上站点（需已部署）"
            : "已用电脑局域网地址生成；手机需与电脑同一 Wi-Fi";
        }
        renderQr(qr, demoUrl, tip);
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

  /* Figma 官方五色标志（内联 SVG，不额外请求） */
  const FIGMA_MARK =
    `<svg class="figma-wall-logo" viewBox="0 0 38 57" fill="none" aria-hidden="true">` +
    `<path d="M9.5 57a9.5 9.5 0 0 0 9.5-9.5V38H9.5a9.5 9.5 0 0 0 0 19Z" fill="#0ACF83"/>` +
    `<path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5Z" fill="#A259FF"/>` +
    `<path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5Z" fill="#F24E1E"/>` +
    `<path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0Z" fill="#FF7262"/>` +
    `<path d="M38 28.5A9.5 9.5 0 1 1 19 28.5a9.5 9.5 0 0 1 19 0Z" fill="#1ABCFE"/>` +
    `</svg>`;

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
        `<span class="figma-wall-top">` +
        `<span class="figma-wall-num">${String(i + 1).padStart(2, "0")}</span>` +
        FIGMA_MARK +
        `</span>` +
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
