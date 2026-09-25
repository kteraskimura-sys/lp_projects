/* ========================================
   共通コンポーネント
   使い方：<div data-component="bottom-cta" data-base="../"></div>
   data-base はサイトルート（top-test）までの相対パス
   2026-09-25
======================================== */

(function () {
  const templates = {
    "bottom-cta": function (base) {
      return `
		<section class="common-cta">
			<div class="common-cta__inner">
				<div class="common-cta__content">
					<div class="common-cta__text">
						<h2>
							空き家のお悩みは<br class="common-cta__title-br">ありませんか？
						</h2>
						<p>
							相続した実家、長年放置している空き家、残置物が残る住宅など、空き家に関するお悩みは一人で抱え込まずにご相談ください。
						</p>
					</div>

					<div class="common-cta__buttons">
						<a href="${base}contact/" class="btn btn--orange">
							<img src="${base}img/top/hero_cta_icon_01a.svg" alt="" class="btn-icon">
							<span class="btn-cta__text">
								<span class="btn-cta__main">無料相談フォーム</span>
								<span class="btn-cta__sub">24時間受付中</span>
							</span>
						</a>

						<a href="tel:0120949017" class="btn btn--outline-green btn--phone">
							<img src="${base}img/top/hero_cta_icon_02a.svg" alt="" class="btn-icon">
							<span class="btn-phone__text">
								<span class="btn-phone__number">0120-949-017</span>
								<span class="btn-phone__time">受付時間 10:00〜19:00（平日）</span>
							</span>
						</a>

						<a href="https://lin.ee/CtLONst" class="btn btn--green btn--line" target="_blank" rel="noopener">
							<img src="${base}img/top/hero_cta_icon_03a.svg" alt="" class="btn-icon">
							<span class="btn-cta__text">
								<span class="btn-cta__main">LINEで相談する</span>
								<span class="btn-cta__sub">かんたん相談受付中</span>
							</span>
						</a>
					</div>
				</div>

				<div class="common-cta__visual" aria-hidden="true">
					<picture>
						<source media="(max-width: 750px)" srcset="${base}img/common/last-cta-hiromi-sp-01a.webp">
						<img src="${base}img/common/last-cta-hiromi-01a.webp" alt="">
					</picture>
				</div>
			</div>
		</section>`;
    }
  };

  document.querySelectorAll("[data-component]").forEach(function (el) {
    const template = templates[el.dataset.component];

    if (template) {
      el.outerHTML = template(el.dataset.base || "");
    }
  });
})();
