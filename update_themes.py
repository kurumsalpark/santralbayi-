import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

theme_map = {
    "'setup'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/60 shadow-md shadow-amber-500/20 flex items-center justify-center group-hover:border-amber-400 transition-all',
    "'system_status'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/60 shadow-md shadow-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400 transition-all',
    "'dealer_portal'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/60 shadow-md shadow-indigo-500/20 flex items-center justify-center group-hover:border-indigo-400 transition-all',
    "'subscriber_portal'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/60 shadow-md shadow-emerald-500/20 flex items-center justify-center group-hover:border-emerald-400 transition-all',
    "'dealer_screen_portal'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/60 shadow-md shadow-indigo-500/20 flex items-center justify-center group-hover:border-indigo-400 transition-all',
    "'district_dealer_screen'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-violet-950/60 via-slate-900 to-slate-950 border border-violet-500/60 shadow-md shadow-violet-500/20 flex items-center justify-center group-hover:border-violet-400 transition-all',
    "'certificate'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border border-amber-400/70 shadow-md shadow-amber-400/25 flex items-center justify-center group-hover:border-amber-300 transition-all',
    "'white_label'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-yellow-950/60 via-slate-900 to-slate-950 border border-yellow-400/70 shadow-md shadow-yellow-400/25 flex items-center justify-center group-hover:border-yellow-300 transition-all',
    "'router'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/60 shadow-md shadow-blue-500/20 flex items-center justify-center group-hover:border-blue-400 transition-all',
    "'dealers'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/60 shadow-md shadow-purple-500/20 flex items-center justify-center group-hover:border-purple-400 transition-all',
    "'profit_rules'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-fuchsia-950/60 via-slate-900 to-slate-950 border border-fuchsia-500/60 shadow-md shadow-fuchsia-500/20 flex items-center justify-center group-hover:border-fuchsia-400 transition-all',
    "'whatsapp_ai'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-400/80 shadow-md shadow-emerald-500/30 flex items-center justify-center group-hover:border-emerald-300 transition-all',
    "'ai_brain'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/60 shadow-md shadow-rose-500/20 flex items-center justify-center group-hover:border-rose-400 transition-all',
    "'appointments'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/60 shadow-md shadow-teal-500/20 flex items-center justify-center group-hover:border-teal-400 transition-all',
    "'logs'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-sky-950/60 via-slate-900 to-slate-950 border border-sky-500/60 shadow-md shadow-sky-500/20 flex items-center justify-center group-hover:border-sky-400 transition-all',
    "'finance'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border border-amber-400/70 shadow-md shadow-amber-400/25 flex items-center justify-center group-hover:border-amber-300 transition-all',
    "'digital_receipt_qr'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-400/60 shadow-md shadow-indigo-400/20 flex items-center justify-center group-hover:border-indigo-300 transition-all',
    "'customer_loyalty'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-pink-950/60 via-slate-900 to-slate-950 border border-pink-500/60 shadow-md shadow-pink-500/20 flex items-center justify-center group-hover:border-pink-400 transition-all',
    "'dealer_demo_grant'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 border border-amber-400/70 shadow-md shadow-amber-400/25 flex items-center justify-center group-hover:border-amber-300 transition-all',
    "'storefront_qr_kit'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-teal-950/60 via-slate-900 to-slate-950 border border-teal-400/60 shadow-md shadow-teal-400/20 flex items-center justify-center group-hover:border-teal-300 transition-all',
    "'payout_requests'": 'w-13 h-13 rounded-2xl bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-400/60 shadow-md shadow-emerald-400/20 flex items-center justify-center group-hover:border-emerald-300 transition-all',
}

lines = content.split('\n')
new_lines = []
current_app_id = None

for line in lines:
    for app_key in theme_map:
        if f'if (id === {app_key})' in line:
            current_app_id = app_key
            break
    
    if current_app_id and 'className="w-13 h-13 rounded-2xl bg-slate-900/90' in line:
        cls = theme_map[current_app_id]
        line = f'                              <div className="{cls}">'
        current_app_id = None
    
    new_lines.append(line)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print('Themes successfully updated in App.tsx')
