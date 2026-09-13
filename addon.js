(async () => {
  // 1. Inject the Telegram Button
  const btn = document.createElement('a');
  btn.href = 'https://t.me/+10N_SpxiQWA1NGY1';
  btn.target = '_blank';
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/></svg><span>JOIN TELEGRAM</span>';
  btn.style.cssText = 'display:flex;align-items:center;justify-content:center;margin-top:8px;padding:8px 12px;background:#2AABEE;color:#fff;font-weight:bold;font-size:11px;border-radius:8px;text-decoration:none;letter-spacing:.5px;text-transform:uppercase;box-shadow:0 2px 8px rgba(42,171,238,0.3);';
  
  const panel = document.querySelector('#cyberPanel .cyber-body') || document.getElementById('cyberPanel');
  if (panel) panel.appendChild(btn);

  // 2. Check Subscription Expiry
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

    // Show warning if 3 days or fewer remaining (or if expired)
    if (daysLeft <= 3) {
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:20px;font-family:sans-serif;';
      modal.innerHTML = `
        <div style="background:#111827;border:1px solid #ff2d55;border-radius:14px;padding:24px;max-width:320px;width:100%;text-align:center;box-shadow:0 0 20px rgba(255,45,85,0.35);">
          <div style="font-size:32px;margin-bottom:8px;">⚠️</div>
          <h3 style="color:#fff;margin:0 0 8px;font-size:16px;text-transform:uppercase;">Subscription Expiring</h3>
          <p style="color:#bbb;font-size:13px;line-height:1.4;margin:0 0 16px;">
            ${daysLeft <= 0 ? 'Your access has expired.' : `Your subscription ends in <b style="color:#ff2d55">${daysLeft} day${daysLeft > 1 ? 's' : ''}</b>.`} Renew now to prevent bot disruption.
          </p>
          <a href="https://t.me/+10N_SpxiQWA1NGY1" target="_blank" style="display:block;background:#00f7ff;color:#000;padding:10px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:12px;text-transform:uppercase;margin-bottom:8px;">
            RENEW VIA TELEGRAM
          </a>
          <button id="dismissRenew" style="background:transparent;border:none;color:#777;font-size:11px;cursor:pointer;text-decoration:underline;">
            Dismiss
          </button>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('dismissRenew').onclick = () => modal.remove();
    }
  } catch (err) {
    console.error("Renewal check failed:", err);
  }
})();
