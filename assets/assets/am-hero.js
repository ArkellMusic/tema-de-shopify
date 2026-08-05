```javascript
/* =========================================================
   AM SHOP — 3D HERO JAVASCRIPT
   ========================================================= */

(() => {

  /* =======================================================
     ELEMENTOS
     ======================================================= */

  const hero =
    document.querySelector("[data-am-hero]");

  if (!hero) return;


  const button =
    hero.querySelector("[data-enter-store]");


  const logoContainer =
    hero.querySelector("[data-logo-container]");


  const dragHint =
    hero.querySelector("[data-drag-hint]");


  const video =
    hero.querySelector(".am-hero__video");


  const status =
    hero.querySelector(".am-hero__status");


  const destination =
    hero.dataset.enterUrl ||
    "/collections/all";


  /* =======================================================
     ESTADO
     ======================================================= */

  let entering = false;

  let interacted = false;


  /* =======================================================
     OCULTAR MENSAJE
     "ARRASTRA PARA GIRAR"
     ======================================================= */

  const hideDragHint = () => {

    if (interacted) return;

    interacted = true;

    if (dragHint) {

      dragHint.classList.add(
        "is-hidden"
      );

    }

  };


  /* =======================================================
     DETECTAR INTERACCIÓN CON EL LOGO
     ======================================================= */

  const logo =
    hero.querySelector(
      ".am-hero__logo"
    );


  if (logo) {

    logo.addEventListener(
      "pointerdown",
      hideDragHint,
      {
        once: true
      }
    );

  }


  /* =======================================================
     VÍDEO
     ======================================================= */

  if (video) {

    const playVideo = () => {

      video
        .play()
        .catch(() => {});

    };


    if (
      video.readyState >= 2
    ) {

      playVideo();

    } else {

      video.addEventListener(
        "loadeddata",
        playVideo,
        {
          once: true
        }
      );

    }


    /*
      Si el usuario vuelve a la pestaña,
      intentamos continuar el vídeo.
    */

    document.addEventListener(
      "visibilitychange",
      () => {

        if (
          !document.hidden
        ) {

          playVideo();

        }

      }
    );

  }


  /* =======================================================
     ENTRAR A LA TIENDA
     ======================================================= */

  const enterStore = () => {

    if (entering) return;

    entering = true;


    /*
      Accesibilidad
    */

    if (status) {

      status.textContent =
        "Entrando en la tienda…";

    }


    /*
      Comenzamos animación
    */

    hero.classList.add(
      "is-entering"
    );


    /*
      Esperamos a que termine
      el zoom.
    */

    window.setTimeout(
      () => {

        /*
          Pequeño fade final
        */

        hero.style.opacity = "0";


        /*
          Navegación
        */

        window.setTimeout(
          () => {

            window.location.href =
              destination;

          },
          220
        );

      },
      1180
    );

  };


  /* =======================================================
     BOTÓN
     ======================================================= */

  if (button) {

    button.addEventListener(
      "click",
      enterStore
    );


    /*
      Accesibilidad teclado
    */

    button.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          enterStore();

        }

      }
    );

  }


  /* =======================================================
     TECLA ESC
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        entering
      ) {

        entering = false;

        hero.classList.remove(
          "is-entering"
        );

        hero.style.opacity = "";

      }

    }
  );


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (
    reducedMotion.matches
  ) {

    hero.classList.add(
      "am-reduced-motion"
    );

  }


  /* =======================================================
     FIN
     ======================================================= */

})();
```
