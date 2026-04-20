<script lang="ts" setup></script>

<template>
  <footer class="bg-slate-900 border-t border-slate-700 text-slate-300">
    <div class="max-w-7xl mx-auto px-6 py-10">
      <!-- TOP -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- BRAND -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 rounded-lg bg-green-100">
              <Trophy class="w-5 h-5 text-green-700" />
            </div>

            <h2 class="text-white font-semibold">FIFA World Cup 2026</h2>
          </div>

          <p class="text-sm text-slate-400 leading-relaxed">
            Tu plataforma para seguir partidos, estadios, rankings y la
            experiencia completa del Mundial.
          </p>
        </div>

        <!-- LINKS -->
        <div>
          <h3 class="text-white font-semibold mb-3">Navegación</h3>

          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/" class="footer-link">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/chats" class="footer-link">Chats</RouterLink>
            </li>
            <li>
              <RouterLink to="/task-group" class="footer-link"
                >Tareas</RouterLink
              >
            </li>
          </ul>
        </div>

        <!-- INFO -->
        <div>
          <h3 class="text-white font-semibold mb-3">Información</h3>

          <ul class="space-y-2 text-sm text-slate-400">
            <li>🏟 Estadios oficiales</li>
            <li>⚽ Partidos en vivo</li>
            <li>📊 Ranking de fans</li>
            <li>🌍 Cobertura mundial</li>
          </ul>
        </div>
      </div>

      <!-- DIVIDER -->
      <div class="my-8 border-t border-slate-700"></div>

      <!-- BOTTOM -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-slate-500">
          © 2026 FIFA World Cup Dashboard. Todos los derechos reservados.
        </p>

        <div class="flex items-center gap-4 text-xs">
          <a href="#" class="footer-link">Privacidad</a>
          <a href="#" class="footer-link">Términos</a>
          <a href="#" class="footer-link">Contacto</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link {
  color: #94a3b8;
  transition: color 0.2s ease;
  position: relative;
}

.footer-link:hover {
  color: #d2ffb7;
}

.footer-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 1px;
  background: #d2ffb7;
  transition: width 0.2s ease;
}

.footer-link:hover::after {
  width: 100%;
}
</style>
