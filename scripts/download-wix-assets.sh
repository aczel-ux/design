#!/usr/bin/env bash
set -euo pipefail

destination="src/assets/projects"
mkdir -p "$destination"

download() {
  local name="$1"
  local url="$2"
  if [[ ! -f "$destination/$name" ]]; then
    curl -fL --retry 3 --silent --show-error "$url" -o "$destination/$name"
  fi
}

# Covers from the public Wix sitemap.
download octo-design-system-cover.png 'https://static.wixstatic.com/media/94c0c9_79b2613b2f43433bbc0eb679d8c05dc3~mv2.png'
download goto-mobile-apps-cover.png 'https://static.wixstatic.com/media/94c0c9_5ea72e90fc3745a2ab9c0b29f3a4d17a~mv2.png'
download chameleon-design-system-cover.png 'https://static.wixstatic.com/media/94c0c9_eb7d199e80754137a9d4791ee5202bf1~mv2.png'
download gotomeeting-messenger-cover.png 'https://static.wixstatic.com/media/94c0c9_11a3860220c94032a9733d58bf23e4c2~mv2.png'
download gotomeeting-mobile-cover.png 'https://static.wixstatic.com/media/94c0c9_d177520735d140f7bafd6578229458bb~mv2.png'
download orthograph-i-cover.jpeg 'https://static.wixstatic.com/media/94c0c9_95b6616bd1f04061b931d269afd0b5bf~mv2.jpeg'
download orthograph-tablets-cover.png 'https://static.wixstatic.com/media/94c0c9_996995ecf180449ea69a2bb8f795d6f7~mv2.png'
download miratia-app-cover.png 'https://static.wixstatic.com/media/94c0c9_7b77538f169341f9ad71674c29c73629~mv2.png'
download wlrp-admin-cover.jpeg 'https://static.wixstatic.com/media/94c0c9_89a4fa12da1a4c3db444835509c00dae~mv2.jpeg'
download wlrp-pwa-cover.jpeg 'https://static.wixstatic.com/media/94c0c9_017a1fa27da641869fc1b41e50167fec~mv2.jpeg'
download pubcrawl-cover.jpeg 'https://static.wixstatic.com/media/94c0c9_07527f04f5b34f3589e352c2e8a1a3bb~mv2.jpeg'
download miratia-web-cover.png 'https://static.wixstatic.com/media/94c0c9_0b7cfb3171094836a8760689a816ede2~mv2.png'
download sajo-cover.png 'https://static.wixstatic.com/media/94c0c9_7899f1b0bb314a43990effbebd42f79b~mv2.png'
download schonherz-cover.png 'https://static.wixstatic.com/media/94c0c9_16d33ae36743468dbc64314f3f539952~mv2.png'
download labimmun-cover.png 'https://static.wixstatic.com/media/94c0c9_be8b21ceacea4979ab1cfee9a62c0536~mv2.png'
download medi-lab-cover.png 'https://static.wixstatic.com/media/94c0c9_1ba4ce69a52c4bfc83fcd9c2b9b1272d~mv2.png'

# Case-study media extracted from the live articles.
download octo-colors.png 'https://static.wixstatic.com/media/94c0c9_8ff87e14902e4b4086020bd53c9374e5~mv2.png'
download octo-hierarchy.png 'https://static.wixstatic.com/media/94c0c9_d6a477d7c93a4e7691f6f0e020250a5f~mv2.png'
download octo-button.png 'https://static.wixstatic.com/media/94c0c9_8fecc966f168410b84817aa757495f48~mv2.png'
download octo-prompt.png 'https://static.wixstatic.com/media/94c0c9_ba5e7fe0317f430aa44af7df28950dd8~mv2.png'
download octo-icons.png 'https://static.wixstatic.com/media/94c0c9_e97baf5b5e3243f6831766d94fbce0f3~mv2.png'
download goto-app-store.png 'https://static.wixstatic.com/media/94c0c9_7fcca13e1ae547c5b3a3a2741062652e~mv2.png'
download goto-meeting-experience.png 'https://static.wixstatic.com/media/94c0c9_7b7a77032ee3417ca284f18a94c5b249~mv2.png'
download chameleon-tokens.png 'https://static.wixstatic.com/media/94c0c9_505ac012dc5b435588d944b8e313305b~mv2.png'
download chameleon-icons.png 'https://static.wixstatic.com/media/94c0c9_60e46b439c77406aa3efc7c987e31d42~mv2.png'
download chameleon-docs.png 'https://static.wixstatic.com/media/94c0c9_58fb312882df46b280d526de4fd5f4a8~mv2.png'
download messenger-early.png 'https://static.wixstatic.com/media/94c0c9_d4ba3bed32a346d0bd57ae9a71001bde~mv2.png'
download gotomeeting-store.png 'https://static.wixstatic.com/media/94c0c9_d0958dda3c1f4cd6b2de8639357bbfc4~mv2.png'
download gotomeeting-portal.png 'https://static.wixstatic.com/media/94c0c9_20c8f7aef7b44789836932619cb68e92~mv2.png'
download orthograph-ui.png 'https://static.wixstatic.com/media/94c0c9_abb678a683804db69429c1779e8d577b~mv2.png'
download orthograph-view-1.jpeg 'https://static.wixstatic.com/media/94c0c9_8de68a84e165487c800000eed7afdd6e~mv2.jpeg'
download orthograph-view-2.jpeg 'https://static.wixstatic.com/media/94c0c9_7c50e88093c24c4a90b5a02dd913ba43~mv2.jpeg'
download orthograph-icons.png 'https://static.wixstatic.com/media/94c0c9_6c7461340e484a74a9451e76c25c30ce~mv2.png'
download orthograph-navigation.png 'https://static.wixstatic.com/media/94c0c9_1060caf06310491fba37da094b9b376c~mv2.png'
download orthograph-3d.png 'https://static.wixstatic.com/media/94c0c9_5b479069f3c54c16a87bdbe3e540bc88~mv2.png'
download orthograph-tablet-1.png 'https://static.wixstatic.com/media/94c0c9_7341780f3b714616bbc9ceed1307ac35~mv2.png'
download orthograph-tablet-2.png 'https://static.wixstatic.com/media/94c0c9_c336a3a9a0b6442aad1d41c585e14332~mv2.png'
download orthograph-tablet-3.png 'https://static.wixstatic.com/media/94c0c9_97c80c11f67949138adce642a4d25447~mv2.png'
download orthograph-tablet-4.png 'https://static.wixstatic.com/media/94c0c9_6aabfa4385d24799894f055ed841ca3e~mv2.png'
download miratia-app-1.png 'https://static.wixstatic.com/media/94c0c9_6ae5c6e3bc914e5badf25a381b83ca24~mv2.png'
download miratia-app-2.png 'https://static.wixstatic.com/media/94c0c9_4c0724a01bcc42a591883077e5bca554~mv2.png'
download miratia-app-3.png 'https://static.wixstatic.com/media/94c0c9_cd35506c6f0a4f1c8d4f8fff0edeca6b~mv2.png'
download miratia-app-4.png 'https://static.wixstatic.com/media/94c0c9_388d8c52dbc3418693df753c7b11d989~mv2.png'
download miratia-app-5.png 'https://static.wixstatic.com/media/94c0c9_3d33e811721c4bfbbcf45e307a0c5c0b~mv2.png'
download wlrp-admin.jpeg 'https://static.wixstatic.com/media/94c0c9_ea19b05125b94f70a26bfffc92fe94a5~mv2.jpeg'
download wlrp-pwa.png 'https://static.wixstatic.com/media/94c0c9_4474157c5e944b7ca12daf78b8e308b4~mv2.png'
download miratia-web-1.png 'https://static.wixstatic.com/media/94c0c9_003fcede46ee4a35a52ba9d3f5bf8130~mv2.png'
download miratia-web-2.jpg 'https://static.wixstatic.com/media/94c0c9_7061ab02158d462fa2e6a1a7c2e71523~mv2.jpg'
download miratia-web-3.png 'https://static.wixstatic.com/media/94c0c9_860b2c15c8294beaa3e58863630653b9~mv2.png'
download sajo-guide.png 'https://static.wixstatic.com/media/94c0c9_9cadc7c2139e4fa8891e90365a51fab9~mv2.png'
download schonherz-mutations.png 'https://static.wixstatic.com/media/94c0c9_09fe5a64d96b45778ab7eece19f508b4~mv2.png'
download schonherz-structure.png 'https://static.wixstatic.com/media/94c0c9_3737d75839ad46f1b7ab883fc69f9e18~mv2.png'
download labimmun-mutations.png 'https://static.wixstatic.com/media/94c0c9_acd786164d914c338fb3d924c3e29fb1~mv2.png'
download medi-lab-mutations.png 'https://static.wixstatic.com/media/94c0c9_056f4cc1abfa4b35b233142b991a1806~mv2.png'

# Graphics page imagery.
download graphics-editorial.jpg 'https://static.wixstatic.com/media/94c0c9_8b25a588b97f46528d1778eae5c59bd8~mv2.jpg'
download graphics-asimov.png 'https://static.wixstatic.com/media/94c0c9_5d799f856afe42adaf8c00818397b21a~mv2.png'
download graphics-asimov-2.png 'https://static.wixstatic.com/media/94c0c9_170325fb43824d5998487b555abd8f33~mv2.png'
download graphics-asimov-3.png 'https://static.wixstatic.com/media/94c0c9_93616d228409416d91d5d69bf625a0fc~mv2.png'
download graphics-vernon-sullivan-girls.jpeg 'https://static.wixstatic.com/media/94c0c9_c5d1e0971093444fb1184349d1b6be9b~mv2.jpeg'
download graphics-vernon-sullivan-graves.jpeg 'https://static.wixstatic.com/media/94c0c9_68c5f15776de424981ddd3c1cb3b4cc4~mv2.jpeg'
download graphics-hex.png 'https://static.wixstatic.com/media/94c0c9_0ace9bd4a7d943efa8f03517e42e62f0~mv2.png'
download graphics-honey.jpeg 'https://static.wixstatic.com/media/94c0c9_b339424ed8dc40f89489d98d294f8261~mv2.jpeg'
download graphics-swag.png 'https://static.wixstatic.com/media/94c0c9_8748fd5254c44e088aabb08ef7708c55~mv2.png'

echo "Downloaded $(find "$destination" -type f | wc -l | tr -d ' ') project assets."
