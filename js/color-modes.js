/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Bootstrap toma el tema del atributo de <html>.
  // La preferencia auto se convierte en light o dark según el sistema.
  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // Aplica el tema desde el head antes de construir el contenido visible.
  setTheme(getPreferredTheme())

  // Sincroniza la apariencia del selector con la preferencia elegida.
  // focus permite devolver el foco al botón principal después de una selección.
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    // Permite cargar el script en una página sin selector.
    if (!themeSwitcher) {
      return
    }

    // Busca el texto, el ícono activo y el botón correspondiente al tema.
    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)

    // Desmarca todas las opciones visualmente y para lectores de pantalla.
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    // Marca la opción elegida y copia su ícono al botón principal.
    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    // Añade el valor elegido al nombre accesible del control.
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  // Acompaña los cambios del sistema solo en auto o sin elección guardada.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  // Espera a que los controles del HTML existan para configurar sus eventos.
  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    // Cada botón declara el tema que selecciona con data-bs-theme-value.
    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          // Guarda, aplica y muestra la elección; devuelve el foco al selector.
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })
})()
