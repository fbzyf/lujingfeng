/**
 * 上海陆精丰电子有限公司 - 门户网站交互脚本
 * Shanghai Lujingfeng Electronic Technology Co., Ltd.
 * 
 * 功能说明：
 * 1. 导航栏滚动效果
 * 2. 回到顶部按钮
 * 3. 滚动动画（元素淡入）
 * 4. 新闻详情展开/收起
 * 5. 联系表单验证与提交
 * 6. 当前页面导航高亮
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. 导航栏滚动效果 - 滚动时添加阴影
  // ==========================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 2. 回到顶部按钮
  // ==========================================
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    // 监听滚动，显示/隐藏按钮
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 3. 滚动动画 - 元素进入视口时淡入
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if (fadeElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,      // 元素10%可见时触发
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 只触发一次
        }
      });
    }, observerOptions);

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ==========================================
  // 4. 新闻详情展开/收起
  // ==========================================
  const newsToggleBtns = document.querySelectorAll('.news-toggle');
  newsToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const detailEl = document.getElementById(targetId);

      if (detailEl) {
        // 切换显示状态
        detailEl.classList.toggle('show');

        // 更新按钮文字
        if (detailEl.classList.contains('show')) {
          this.textContent = '收起详情 ↑';
        } else {
          this.textContent = '查看详情 →';
        }
      }
    });
  });

  // ==========================================
  // 5. 联系表单验证与提交
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // 获取表单数据
      const name = document.getElementById('formName').value.trim();
      const company = document.getElementById('formCompany').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      // 简单验证
      let isValid = true;
      let errorMsg = '';

      if (!name) {
        errorMsg = '请填写您的姓名';
        isValid = false;
      } else if (!phone && !email) {
        errorMsg = '请至少填写电话或邮箱';
        isValid = false;
      } else if (email && !isValidEmail(email)) {
        errorMsg = '请输入正确的邮箱格式';
        isValid = false;
      } else if (!message) {
        errorMsg = '请填写留言内容';
        isValid = false;
      }

      if (!isValid) {
        alert(errorMsg);
        return;
      }

      // 构建 mailto 链接发送邮件
      const subject = encodeURIComponent('【网站留言】来自 ' + name + (company ? '（' + company + '）' : ''));
      const body = encodeURIComponent(
        '姓名：' + name + '\n' +
        '公司：' + (company || '未填写') + '\n' +
        '电话：' + (phone || '未填写') + '\n' +
        '邮箱：' + (email || '未填写') + '\n' +
        '留言内容：\n' + message
      );

      // 使用 mailto 发送
      window.location.href = 'mailto:josh@linpo.com?subject=' + subject + '&body=' + body;

      // 显示成功提示
      contactForm.style.display = 'none';
      const successEl = document.querySelector('.form-success');
      if (successEl) {
        successEl.classList.add('show');
      }
    });
  }

  // ==========================================
  // 6. 当前页面导航高亮
  // ==========================================
  highlightCurrentNav();

  // ==========================================
  // 7. 品牌页面锚点导航（平滑滚动到品牌详情）
  // ==========================================
  const brandLinks = document.querySelectorAll('.brand-anchor');
  brandLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

});

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} - 是否合法
 */
function isValidEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * 高亮当前页面对应的导航链接
 * 根据当前页面 URL 自动给对应的 nav-link 添加 active 类
 */
function highlightCurrentNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.navbar .nav-link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });
}
