(async () => {
  // 1. Telegram Button in Panel
  const btn = document.createElement('a');
  btn.href = 'https://t.me/+10N_SpxiQWA1NGY1';
  btn.target = '_blank';
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/></svg><span>JOIN TELEGRAM</span>';
  btn.style.cssText = 'display:flex;align-items:center;justify-content:center;margin-top:8px;padding:8px 12px;background:#2AABEE;color:#fff;font-weight:bold;font-size:11px;border-radius:8px;text-decoration:none;letter-spacing:.5px;text-transform:uppercase;box-shadow:0 2px 8px rgba(42,171,238,0.3);';
  
  const panel = document.querySelector('#cyberPanel .cyber-body') || document.getElementById('cyberPanel');
  if (panel) panel.appendChild(btn);

  // 2. Centered Pulsing Warning Banner
  try {
    const rawUser = localStorage.getItem("userInfo");
    if (!rawUser) return;
    const user = JSON.parse(rawUser);
    const memberId = user?.value?.memberId || user?.value?.memberld;
    if (!memberId) return;

    const res = await fetch(`https://jjvfuuprofnrytiwypvb.supabase.co/rest/v1/members?wallet_user_id=eq.${memberId}&select=expires_at`, {
      headers: {
        apikey: "sb_publishable_04fiu8WUbHqqd6Kvn4JcVg_9-Fs9R47",
        Authorization: "Bearer sb_publishable_04fiu8WUbHqqd6Kvn4JcVg_9-Fs9R47"
      }
    });

    const data = await res.json();
    if (!data || !data[0] || !data[0].expires_at) return;

    const expireTime = new Date(data[0].expires_at).getTime();
    const diffMs = expireTime - Date.now();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    // Triggers if 3 days or fewer are remaining
    if (daysLeft <= 3 && daysLeft > 0) {
      const banner = document.createElement('div');
      banner.id = "warnBanner";
      banner.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999999;
        background: rgba(17, 24, 39, 0.95);
        border: 2px solid #ffcc00;
        box-shadow: 0 0 30px rgba(255, 204, 0, 0.4), inset 0 0 15px rgba(255, 204, 0, 0.1);
        backdrop-filter: blur(10px);
        padding: 22px 26px;
        border-radius: 14px;
        text-align: center;
        width: 85%;
        max-width: 320px;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      `;

      banner.innerHTML = `
        <div style="font-size: 26px; margin-bottom: 6px;">⚠️</div>
        <div style="font-size: 15px; font-weight: bold; color: #ffcc00; letter-spacing: 0.5px; text-transform: uppercase;">
          Subscription Expiring
        </div>
        <div style="font-size: 14px; color: #fff; margin: 10px 0 16px 0;">
          Expiring in <span style="color: #ff3366; font-weight: bold; font-size: 16px;">${daysLeft} day${daysLeft > 1 ? 's' : ''}</span>!
        </div>
        <a href="https://t.me/+10N_SpxiQWA1NGY1" target="_blank" style="
          display: block;
          background: #ffcc00;
          color: #000;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          text-decoration: none;
          padding: 10px 0;
          border-radius: 8px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(255, 204, 0, 0.3);
        ">Renew Now</a>
        <button id="closeWarn" style="
          margin-top: 10px;
          background: none;
          border: none;
          color: #888;
          font-size: 11px;
          cursor: pointer;
          text-decoration: underline;
        ">Dismiss</button>
      `;

      document.body.appendChild(banner);
      document.getElementById('closeWarn').onclick = () => banner.remove();
    }
  } catch (err) {
    console.error("Warning check error:", err);
  }
})();
