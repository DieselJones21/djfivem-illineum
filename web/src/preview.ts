import mock from './mock';
import Nui from './Nui';
import { envyThemeLua } from './theme/envy';
import { APPEARANCE_INITIAL_STATE, SETTINGS_INITIAL_STATE } from './components/Appearance/settings';

export const isPreview = (): boolean => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.has('preview') || params.get('showcase') === '1' || !import.meta.env.PROD;
};

const hairColors: number[][] = [
  [9, 8, 7],
  [28, 18, 12],
  [56, 32, 16],
  [92, 54, 24],
  [140, 86, 36],
  [186, 122, 48],
  [214, 168, 86],
  [232, 210, 150],
  [240, 232, 210],
  [18, 18, 20],
  [40, 42, 48],
  [72, 78, 88],
  [180, 40, 48],
  [220, 80, 40],
  [40, 90, 180],
  [0, 229, 255],
];

export const previewLocales = {
  modal: {
    save: { title: 'Save customization', description: 'Keep this look on your character.' },
    exit: { title: 'Exit customization', description: 'No changes will be saved.' },
    accept: 'Confirm',
    decline: 'Cancel',
  },
  ped: { title: 'Ped', model: 'Model' },
  headBlend: {
    title: 'Inheritance',
    shape: { title: 'Face', firstOption: 'Father', secondOption: 'Mother', mix: 'Mix' },
    skin: { title: 'Skin', firstOption: 'Father', secondOption: 'Mother', mix: 'Mix' },
    race: { title: 'Race', shape: 'Shape', skin: 'Skin', mix: 'Mix' },
  },
  faceFeatures: {
    title: 'Face Features',
    nose: {
      title: 'Nose',
      width: 'Width',
      height: 'Height',
      size: 'Size',
      boneHeight: 'Bone height',
      boneTwist: 'Bone twist',
      peakHeight: 'Peak height',
    },
    eyebrows: { title: 'Eyebrows', height: 'Height', depth: 'Depth' },
    cheeks: { title: 'Cheeks', boneHeight: 'Bone height', boneWidth: 'Bone width', width: 'Width' },
    eyesAndMouth: { title: 'Eyes and Mouth', eyesOpening: 'Eyes opening', lipsThickness: 'Lip thickness' },
    jaw: { title: 'Jaw', width: 'Width', size: 'Size' },
    chin: { title: 'Chin', lowering: 'Lowering', length: 'Length', size: 'Size', hole: 'Hole size' },
    neck: { title: 'Neck', thickness: 'Thickness' },
  },
  headOverlays: {
    title: 'Appearance',
    hair: { title: 'Hair', style: 'Style', color: 'Color', highlight: 'Highlight', fade: 'Fade', texture: 'Texture' },
    opacity: 'Opacity',
    style: 'Style',
    color: 'Color',
    secondColor: 'Secondary color',
    blemishes: 'Blemishes',
    beard: 'Beard',
    eyebrows: 'Eyebrows',
    ageing: 'Ageing',
    makeUp: 'Makeup',
    blush: 'Blush',
    complexion: 'Complexion',
    sunDamage: 'Sun damage',
    lipstick: 'Lipstick',
    moleAndFreckles: 'Moles & freckles',
    chestHair: 'Chest hair',
    bodyBlemishes: 'Body blemishes',
    eyeColor: 'Eye color',
  },
  components: {
    title: 'Clothing',
    drawable: 'Drawable',
    texture: 'Texture',
    mask: 'Mask',
    upperBody: 'Arms',
    lowerBody: 'Pants',
    bags: 'Bags',
    shoes: 'Shoes',
    scarfAndChains: 'Scarf and chains',
    shirt: 'Shirt',
    bodyArmor: 'Body armor',
    decals: 'Decals',
    jackets: 'Jackets',
    head: 'Head',
  },
  props: {
    title: 'Accessories',
    drawable: 'Drawable',
    texture: 'Texture',
    hats: 'Hats',
    glasses: 'Glasses',
    ear: 'Ear',
    watches: 'Watches',
    bracelets: 'Bracelets',
  },
  tattoos: {
    title: 'Tattoos',
    items: {
      ZONE_TORSO: 'Torso',
      ZONE_HEAD: 'Head',
      ZONE_LEFT_ARM: 'Left arm',
      ZONE_RIGHT_ARM: 'Right arm',
      ZONE_LEFT_LEG: 'Left leg',
      ZONE_RIGHT_LEG: 'Right leg',
    },
    apply: 'Apply',
    delete: 'Delete',
    deleteAll: 'Delete all',
    opacity: 'Opacity',
  },
};

const tattoo = (zone: string, name: string, label: string) => ({
  name,
  label,
  hashMale: `male_${name}`,
  hashFemale: `female_${name}`,
  zone,
  collection: 'envy',
  opacity: 1,
});

export const registerPreviewMocks = (): void => {
  mock('get_theme_configuration', () => ({
    currentTheme: 'envy',
    themes: [envyThemeLua],
  }));

  mock('appearance_get_locales', () => previewLocales);

  mock('appearance_get_settings', () => ({
    appearanceSettings: {
      ...SETTINGS_INITIAL_STATE,
      eyeColor: { min: 0, max: 24 },
      hair: {
        ...SETTINGS_INITIAL_STATE.hair,
        color: { items: hairColors },
        highlight: { items: hairColors },
      },
      tattoos: {
        ...SETTINGS_INITIAL_STATE.tattoos,
        items: {
          ZONE_HAIR: [tattoo('ZONE_HAIR', 'fade_01', 'Fade 01'), tattoo('ZONE_HAIR', 'fade_02', 'Fade 02')],
          ZONE_TORSO: [tattoo('ZONE_TORSO', 'dragon', 'Dragon'), tattoo('ZONE_TORSO', 'skull', 'Skull')],
          ZONE_HEAD: [tattoo('ZONE_HEAD', 'tear', 'Tear')],
          ZONE_LEFT_ARM: [tattoo('ZONE_LEFT_ARM', 'sleeve', 'Sleeve')],
          ZONE_RIGHT_ARM: [tattoo('ZONE_RIGHT_ARM', 'koi', 'Koi')],
          ZONE_LEFT_LEG: [tattoo('ZONE_LEFT_LEG', 'rose', 'Rose')],
          ZONE_RIGHT_LEG: [tattoo('ZONE_RIGHT_LEG', 'banner', 'Banner')],
        },
      },
    },
  }));

  mock('appearance_get_data', () => ({
    config: {
      ped: true,
      headBlend: true,
      faceFeatures: true,
      headOverlays: true,
      components: true,
      componentConfig: {
        masks: true,
        upperBody: true,
        lowerBody: true,
        bags: true,
        shoes: true,
        scarfAndChains: true,
        bodyArmor: true,
        shirts: true,
        decals: true,
        jackets: true,
      },
      props: true,
      propConfig: {
        hats: true,
        glasses: true,
        ear: true,
        watches: true,
        bracelets: true,
      },
      tattoos: true,
      enableExit: true,
      hasTracker: false,
      automaticFade: false,
    },
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_m_freemode_01', tattoos: {} },
  }));

  mock('appearance_change_model', () => SETTINGS_INITIAL_STATE);
  mock('appearance_change_component', () => SETTINGS_INITIAL_STATE.components[0]);
  mock('appearance_change_prop', () => SETTINGS_INITIAL_STATE.props[0]);
  mock('appearance_change_hair', () => SETTINGS_INITIAL_STATE.hair);
  mock('appearance_apply_tattoo', () => true);
  mock('appearance_preview_tattoo', () => true);
  mock('appearance_delete_tattoo', () => true);
  mock('appearance_save', () => true);
  mock('appearance_exit', () => true);
  mock('appearance_set_camera', () => true);
  mock('appearance_turn_around', () => true);
  mock('appearance_rotate_camera', () => true);
  mock('appearance_wear_clothes', () => true);
  mock('appearance_remove_clothes', () => true);
  mock('appearance_change_head_blend', () => true);
  mock('appearance_change_face_feature', () => true);
  mock('appearance_change_head_overlay', () => true);
  mock('appearance_change_eye_color', () => true);
};

export const bootPreview = (): void => {
  document.body.classList.add('preview');
  window.setTimeout(() => {
    Nui.emitEvent('appearance_display', { asynchronous: false });
  }, 50);
};
