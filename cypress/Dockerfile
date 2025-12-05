FROM cgr.dev/chainguard-private/node-fips:latest-dev

USER root
# 1) System deps needed by Cypress (Electron/headless)
RUN apk update && apk add --no-cache \
    alsa-lib at-spi2-core cairo cups-libs dbus dbus-libs dbus-x11 \
    font-misc fontconfig-config freetype fribidi gdk-pixbuf glib \
    graphite2 gtk-3 gtk-3-compiled-gschemas harfbuzz harfbuzz-icu \
    lcms2 libdrm libepoxy libfontconfig1 libglvnd libheif libice \
    libjpeg-turbo libjxl libnotify libnspr libnss libogg librsvg \
    libsdl2 libsm libtheora libudev libunistring libvorbis libwebp \
    libx11 libxau libxcb libxcomposite libxcursor libxdamage libxdmcp \
    libxext libxfixes libxfont libxft libxi libxinerama libxkb \
    libxkbcommon libxml2-16 libxmu libxrandr libxrender libxshmfence \
    libxslt libxt libxtst libxv mesa-gbm mesa-libgallium openh264 opus \
    orc pango pixman shared-mime-info sqlite-libs svt-av1 ttf-dejavu \
    tiff vulkan-loader wayland wayland-libs-client wayland-libs-cursor \
    wayland-libs-egl wayland-libs-server xauth xkeyboard-config \
    xorg-server xorgproto xtrans zlib zstd

WORKDIR /e2e

# 2) Install npm deps + Cypress binary
COPY package.json package-lock.json* ./
RUN npm ci && npx cypress install

# 3) Copy Cypress config + project into the image
COPY cypress.config.js /e2e/cypress.config.js
COPY cypress/ /e2e/cypress

# 4) Create nonroot user and fix permissions
RUN addgroup -S nonroot \
 && adduser -S nonroot -G nonroot -h /home/nonroot \
 && mkdir -p /home/nonroot \
 && chown -R nonroot:nonroot /e2e /home/nonroot

USER nonroot

ENV CYPRESS_CACHE_FOLDER=/home/nonroot/.cache/Cypress

# 5) Default: run Cypress tests headless
CMD ["npm", "test"]