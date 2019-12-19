import re
from collections import defaultdict

import requests
from lxml.html import HtmlElement, fromstring

URL = 'https://selab.hanyang.ac.kr/courses/cse326/2019/'


def _scrap_slide_links() -> dict:
  ret = defaultdict(list)

  res = requests.get(URL)
  elements = fromstring(res.text)

  for each in elements.cssselect('#lecture a'):
    ret['lecture'].append(URL + each.attrib['href'])
  for each in elements.cssselect('#lab a'):
    ret['lab'].append(URL + each.attrib['href'][2:])  # removes './'
  return ret


def _scrap_slides(url, category) -> list:
  """
  {
    'title': str,
    'href': str,
    'category': 'lab' or 'lecture',
    'text': str,
    'code': str
  }
  """
  res = requests.get(url)
  page_source = res.text
  page: HtmlElement = fromstring(page_source, url)

  def _norm_text(text):
    text = re.sub(r'\n|\t', ' ', text)
    text = text.strip()
    return text

  slides = []
  for idx, each in enumerate(page.cssselect('div .slide')):
    slide = {
        'title': each.cssselect('h1')[0].text_content(),
        'href': each.base_url + f'#slide{idx}',
        'category': category
    }

    try:
      slide['text'] = each.cssselect('ul')[0].text_content()
    except IndexError:
      slide['text'] = ''
    try:
      slide['code'] = each.cssselect('pre')[0].text_content()
    except IndexError:
      slide['code'] = ''

    for k, v in slide.items():
      slide[k] = _norm_text(v)
    slides.append(slide)

  return slides


def scrap() -> list:
  links = _scrap_slide_links()
  slides = []

  for category, link in links.items():
    if not category:
      continue
    for url in link:
      slides.extend(_scrap_slides(url, category))
  return slides


if __name__ == '__main__':
  examples_url = 'https://selab.hanyang.ac.kr/courses/cse326/2019/lecture/12-ajaxXmlJson.html'
  links = _scrap_slide_links()
  from pprint import pprint
  pprint(links)
  _scrap_slides(examples_url, category='lab')
