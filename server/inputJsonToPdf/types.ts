export type ResponseOptionType = {
  id: string;
  label: string;
};

export type InputJSONResponseType =
  | string
  | number
  | ResponseOptionType
  | Array<ResponseOptionType>
  | null;

export enum InputJSONQuestionType {
  text = "text",
  singleSelect = "singleselection",
  multiSelect = "multiselection",
}

export enum QuestionTypeEnum {
  text = "text",
  number = "number",
  date = "date",
  singleSelect = "singleselection",
  multiSelect = "multiselection",
  group = "group",
  label = "label",
  button = "button",

}

export enum DisplayTypeEnum {
  numeric = 'numeric',
  dropdown = 'dropdown',
  button = 'button',
  radio = 'radio',
  date = 'date',
  text = 'text',
  number = 'number',
  textarea = 'textarea',
  list = 'list',
  breadcrumb = 'breadcrumb',
  slider = 'slider',
  radio_rectangle = 'radio_rectangle',
  radio_button = 'radio_button',
  questions_group = 'questions_group',
  product_card = 'product_card',
  unordered_list_item = 'unordered_list_item',
  unordered_list = 'unordered_list',
  banner = 'banner',
  radio_table = 'radio_table',
  checkbox = 'checkbox',
  datepicker = 'datepicker',
  group = 'group',
  data_selector = 'data_selector',
  label = 'label',
  grid_info = 'grid_info',
  grid_header = 'grid_header',
  accordion = 'accordion',
  beneficiary_list = 'beneficiary_list',
  address_group = 'address_group'
};

export interface IValidationsRaw {
  max_value?: {
    value: string | number;
    error_message: string;
    is_exact_message: boolean;
  };
  min_value?: {
    value: string | number;
    error_message: string;
    is_exact_message: boolean;
  };
  auto_format?: {
    type?: string;
    value?: string;
    error_message?: string;
    pattern?: string;
    format?: string;
    preserveFormattingInCb?: boolean;
  };
  sample_value?: {
    value: string;
    error_message: string;
  };
  placeholder_text?: {
    value: string;
    error_message: string;
    hide: boolean;
  };
  suffix?: {
    value: string;
    hide: boolean;
  };
  prefix?: {
    value: string;
    hide: boolean;
  };
  metric?: {
    display_position: string;
    value: string;
  };
  required?: {
    value: boolean;
    error_message: string;
  };
  max_length?: {
    value: string;
    restrict: boolean;
    error_message: string;
  };
  pattern?: {
    error_message: string;
    value: string;
  };
  min_length?: {
    error_message: string;
    value: string;
  };
  step?: {
    value: number;
    error_message: string;
  };
  mask?: {
    value: string;
    mask_char: string;
  };
  phone_number_validation?: {
    value: string;
    error_message: string;
  };
  custom_validations?: {
    value: string;
    error_message: string;
  };
  must_match?: {
    value: string;
    error_message: string;
    question_id: string;
  };
  precision?: {
    value: string;
    error_message: string;
  };
  error_message?: {
    error_message: string;
  };
  format?: {
    error_message: string;
  };
  currency?: IValidationsRaw['auto_format'];
  disabled?: boolean;
  placeholder?: string;
  customError?: {
    value?: string;
    error_message?: string;
  };
  responseFormat?: string;
  popperMinValue?: string;
  popperMaxValue?: string;
  phoneNumberValidation?: IValidationsRaw['phone_number_validation'];
  mustMatch?: IValidationsRaw['must_match'];
  matchQuestionAnswer?: string;
  showCustomError?: boolean;
  slider_type?: string;
  editable?: string;
  largeNumberSymbol?: boolean;
}

export interface Breadcrumbs {
  breadcrumb_id: string;
  section_id: string;
  title: string;
  state: string;
  source_id: number;
  img_url: string;
  active_img_url: string;
  inactive_img_url: string;
  show: boolean;
  clickable: boolean;
  index?: number;
  active?: boolean;
}

export interface IQuestionRaw {
  add_button_text?: string;
  answer?: string;
  current_list_answer_index?: number;
  child_questions?: boolean;
  child_questions_completed_flag?: any;
  child_questions_on?: string[];
  collapsable_div_text?: string;
  display_immediately?: string | boolean;
  display_type: DisplayTypeEnum;
  has_collapsable_div?: boolean;
  has_items?: boolean;
  hasEdit?: boolean;
  hasMask?: boolean;
  have_questions?: boolean;
  hint_text?: string;
  img_url?: string;
  active_img_url?: string;
  inactive_img_url?: string;
  index?: number;
  is_edit_icon_visible?: boolean;
  is_editable?: boolean;
  is_hidden?: boolean;
  is_readonly?: boolean;
  is_reviewable?: boolean;
  list_add_button_label?: string;
  orientation?: string;
  original_questions?: IQuestionRaw[];
  page_title?: string;
  parent_question_answer?: unknown;
  presentation_type?: string;
  question_description?: string;
  helper_text?: string;
  question_id: string;
  question_status?: string;
  question_status_message?: string;
  question_subtitle?: string;
  question_text: string;
  question_type: QuestionTypeEnum;
  questions: IQuestionRaw['display_type'] extends DisplayTypeEnum.beneficiary_list ? IQuestionRaw[][] : IQuestionRaw[];
  reflexive_index?: number;
  reflexive_question_flag?: boolean;
  share_response?: [string];
  response: InputJSONResponseType;
  response_options: ResponseOptionType[];
  selector_options?: { id: string }[];
  sequence_number?: number;
  show_always?: boolean;
  submission_type?: string;
  sureify_meta?: { source_id?: 1 };
  tooltip?: string;
  validations?: IValidationsRaw;
  default_response?: InputJSONResponseType;
  type?: string;
  field_name?: string;
  sub_type?: string;
  sureify_id?: string;
}

export interface BannerContent {
  header: string;
  text?: string;
  url?: string;
  'video-url'?: string;
  button_text?: string;
  bullet_type?: string;
  bullet_list?: string[];
}

export interface Banners {
  banner_type: string;
  content: BannerContent;
}

export interface TopConfig {
  text: string;
  is_hidden: boolean;
}

export type InputJSONType = {
  data: {
    questionnaire: {
      questions: IQuestionRaw[]
    }
  },
  breadcrumbs: Breadcrumbs[]
};

export enum LayoutType {
  single = 'single',
  double = 'double'
}