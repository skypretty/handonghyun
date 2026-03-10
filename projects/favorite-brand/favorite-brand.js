        // 히어로 이미지 우선 로딩 완료 후 애니메이션 시작
        let heroImageLoaded = false;
        const animatedElements = new Set();
        let observer;

        // 히어로 이미지 로드 체크
        function checkHeroImageLoad() {
            const heroImage = document.querySelector('.hero-image');

            if (heroImage.complete && heroImage.naturalHeight !== 0) {
                heroImageLoaded = true;
                initScrollAnimations();
            } else {
                heroImage.addEventListener('load', () => {
                    heroImageLoaded = true;
                    initScrollAnimations();
                });

                // 5초 후에도 로딩이 안되면 강제 시작
                setTimeout(() => {
                    if (!heroImageLoaded) {
                        heroImageLoaded = true;
                        initScrollAnimations();
                    }
                }, 5000);
            }
        }

        // 스크롤 애니메이션 초기화 (히어로 로딩 후)
        function initScrollAnimations() {
            if (!heroImageLoaded) return;

            const observerOptions = {
                threshold: 0.05,
                rootMargin: '50px'
            };

            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                        if (entry.target.classList.contains('gif-item')) {
                            const index = parseInt(entry.target.getAttribute('data-index') || 0);
                            setTimeout(() => {
                                entry.target.classList.add('animate-in');
                                animatedElements.add(entry.target);
                                observer.unobserve(entry.target);
                            }, index * 10); // 최소 순차 지연
                        } else {
                            entry.target.classList.add('animate-in');
                            animatedElements.add(entry.target);
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, observerOptions);

            // 히어로 이미지 로딩 완료 후 다른 요소들 관찰 시작
            setTimeout(() => {
                document.querySelectorAll('.gif-item, .section-header, .feature-card, .process-step, .image-item').forEach(el => {
                    observer.observe(el);
                });
            }, 500); // 0.5초 추가 딜레이
        }

        // DOM 로드 후 히어로 이미지 체크 시작
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkHeroImageLoad);
        } else {
            checkHeroImageLoad();
        }

        // Feature card mouse follow effect
        let mouseTimeout;
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (mouseTimeout) return;
                mouseTimeout = setTimeout(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                    mouseTimeout = null;
                }, 16);
            });
        });

        // Process step mouse follow effect
        document.querySelectorAll('.process-step').forEach(step => {
            step.addEventListener('mousemove', (e) => {
                const rect = step.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                step.style.setProperty('--mouse-x', `${x}px`);
                step.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Info item mouse follow effect
        document.querySelectorAll('.info-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                item.style.setProperty('--mouse-x', `${x}px`);
                item.style.setProperty('--mouse-y', `${y}px`);
            });
        });
