import { createWebHistory, createRouter } from "vue-router";
import store from "../store";
import AppLayout from "@/views/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/Login.vue"),
      meta: {
        title: "DataRete - Accesso",
      },
    },
    {
      path: "/changepasswordrequest",
      name: "ChangePasswordRequest",
      component: () => import("../views/login/ChangePasswordRequest.vue"),
      meta: {
        title: "DataRete - Richiesta Cambio Password",
      },
    },
    {
      path: "/changepasswordperform/:code",
      name: "ChangePasswordPerform",
      component: () => import("@/views/login/ChangePasswordPerform.vue"),
      meta: {
        title: "DataRete - Realizza Cambio Password",
      },
    },
    {
      path: "/setloginlevel",
      name: "SetLoginLevel",
      component: () => import("../views/login/SetLoginLevel.vue"),
      meta: {
        title: "DataRete - Seleaziona il livello di Accesso",
      },
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/testtry",
          name: "test",
          component: () => import("@/views/TestTry.vue"),
        },
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: {
            title: "DataRete - Dashboard",
          },
        },
        {
          path: "faqs",
          name: "Faqs",
          component: () => import("@/views/Faqs.vue"),
          meta: {
            title: "DataRete - Faqs",
          },
        },
        {
          path: "bacheca",
          name: "bacheca",
          children: [
            {
              path: "circolari",
              name: "circolari",
              component: () => import("@/views/bacheca/Circolari.vue"),
            },
          ],
        },
        {
          path: "anagrafiche",
          name: "anagrafiche",
          children: [
            {
              path: "clienti",
              name: "clienti",
              component: () => import("@/views/anagrafiche/Clienti.vue"),
              meta: {
                title: "DataRete - Clienti",
              },
            },
            {
              path: "lead",
              name: "lead",
              component: () => import("@/views/anagrafiche/Lead.vue"),
              meta: {
                title: "DataRete - Lead",
              },
            },
          ],
        },
        {
          path: "agenda",
          name: "agenda",
          children: [
            {
              path: "calendario",
              name: "calendario",
              component: () => import("@/views/agenda/Calendario.vue"),
              meta: {
                title: "DataRete - Calendario Eventi",
              },
            },
          ],
        },
        {
          path: "pratiche",
          name: "pratiche",
          children: [
            {
              path: "preventivo-mutuo",
              name: "preventivo-mutuo",
              component: () => import("@/views/pratiche/PreventivoMutuo.vue"),
            },
            {
              path: "preventivo-prestito",
              name: "preventivo-prestito",
              component: () =>
                import("@/views/pratiche/PreventivoPrestito.vue"),
            },
            {
              path: "preventivo-cqs",
              name: "preventivo-cqs",
              component: () => import("@/views/pratiche/PreventivoCQS.vue"),
            },
            {
              path: "nuovo-mutuo",
              name: "nuovo-mutuo",
              component: () => import("@/views/pratiche/NuovoMutuo.vue"),
            },
            {
              path: "nuovo-prestito",
              name: "nuovo-prestito",
              component: () => import("@/views/pratiche/NuovoPrestito.vue"),
            },
            {
              path: "nuova-cqs",
              name: "nuova-cqs",
              component: () => import("@/views/pratiche/NuovaCQS.vue"),
            },
            {
              path: "preventivi",
              name: "preventivi",
              component: () => import("@/views/pratiche/Preventivi.vue"),
            },
            {
              path: "bozze",
              name: "bozze",
              component: () => import("@/views/pratiche/Bozze.vue"),
            },
            {
              path: "in-lavorazione",
              name: "in-lavorazione",
              component: () => import("@/views/pratiche/InLavorazione.vue"),
            },
            {
              path: "erogate",
              name: "erogate",
              component: () => import("@/views/pratiche/Erogate.vue"),
            },
            {
              path: "annullate",
              name: "annullate",
              component: () => import("@/views/pratiche/Annullate.vue"),
            },
          ],
        },
        {
          path: "gestione",
          name: "gestione",
          children: [
            {
              path: "utenti",
              component: () => import("@/views/gestione/Users.vue"),
            },
            {
              path: "stati-anagrafica",
              name: "stati-anagrafica",
              component: () => import("@/views/gestione/StatiAnagrafica.vue"),
            },
            {
              path: "stati-evento",
              name: "stati-evento",
              component: () => import("@/views/gestione/StatiEvento.vue"),
            },
            {
              path: "forme-giuriche",
              name: "forme-giuriche",
              component: () => import("@/views/gestione/FormeGiuridiche.vue"),
            },
            {
              path: "sesso",
              name: "sesso",
              component: () => import("@/views/gestione/Sesso.vue"),
            },
            {
              path: "stati-anagrafica",
              name: "stati-anagrafica",
              component: () => import("@/views/gestione/StatiAnagrafica.vue"),
            },
            {
              path: "stati-civili",
              name: "stati-civili",
              component: () => import("@/views/gestione/StatiCivili.vue"),
            },
            {
              path: "stati-giuridici",
              name: "stati-giuridici",
              component: () => import("@/views/gestione/StatiGiuridici.vue"),
            },
            {
              path: "stati-occupazionali",
              name: "stati-occupazionali",
              component: () =>
                import("@/views/gestione/StatiOccupazionali.vue"),
            },
            {
              path: "tipi-contatto",
              name: "tipi-contatto",
              component: () => import("@/views/gestione/TipiContatto.vue"),
            },
            {
              path: "tipi-documento",
              name: "tipi-documento",
              component: () => import("@/views/gestione/TipiDocumento.vue"),
            },
            {
              path: "tipi-indirizzo",
              name: "tipi-indirizzo",
              component: () => import("@/views/gestione/TipiIndirizzo.vue"),
            },
            {
              path: "nazioni",
              name: "nazioni",
              component: () => import("@/views/gestione/Nazioni.vue"),
            },
            {
              path: "regioni",
              name: "regioni",
              component: () => import("@/views/gestione/Regioni.vue"),
            },
            {
              path: "provincie",
              name: "provincie",
              component: () => import("@/views/gestione/Provincie.vue"),
            },
            {
              path: "citta",
              name: "citta",
              component: () => import("@/views/gestione/Citta.vue"),
            },
            {
              path: "tipi-sede",
              component: () => import("@/views/gestione/TipiSede.vue"),
            },
            {
              path: "sedi-azienda",
              component: () => import("@/views/gestione/SediAzienda.vue"),
            },
            {
              path: "livelli-login",
              component: () => import("@/views/gestione/LivelliLogin.vue"),
            },
          ],
        },
        {
          path: "supporto",
          name: "supporto",
          children: [
            {
              path: "legale",
              name: "legale",
              component: () => import("@/views/supporto/Legale.vue"),
            },
            {
              path: "it",
              name: "it",
              component: () => import("@/views/supporto/IT.vue"),
            },
            {
              path: "pratiche",
              name: "supporto-pratiche",
              component: () => import("@/views/supporto/Pratiche.vue"),
            },
          ],
        },
        {
          path: "plugins",
          name: "plugins",
          children: [
            {
              path: "gestione-visitatori",
              component: () => import("@/views/plugins/GestioneVisitatori.vue"),
            },
            {
              path: "prenotazione-sale",
              component: () => import("@/views/plugins/PrenotazioneSale.vue"),
            },
            {
              path: "gestione-sale",
              component: () =>
                import("@/views/plugins/GestioneSaleRiunioni.vue"),
            },
            {
              path: "data-drive",
              component: () => import("@/views/plugins/DataDrive.vue"),
            },
          ],
        },
        {
          path: "/crm/:idAnagrafica",
          name: "crm",
          component: () => import("@/views/CRM/CrmLayout.vue"),
        },
      ],
    },
    
  ],
});

router.beforeEach((to, from, next) => {
  console.log("Authenticated:" + store.getters.isAuthenticated);
  if (to.name !== "Login" && !store.getters.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

// const DEFAULT_TITLE = 'DataRete';
// router.afterEach((to) => {
//     Vue.nextTick(() => {
//         document.title = to.meta.title || DEFAULT_TITLE;
//     });
// });

export default router;
