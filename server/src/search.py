from collections import defaultdict
from pprint import pprint

from src.scraper import scrap


# https://gist.github.com/m00nlight/daa6786cc503fde12a77
class KMP:

  def partial(self, pattern):
    """ Calculate partial match table: String -> [Int]"""
    ret = [0]

    for i in range(1, len(pattern)):
      j = ret[i - 1]
      while j > 0 and pattern[j] != pattern[i]:
        j = ret[j - 1]
      ret.append(j + 1 if pattern[j] == pattern[i] else j)
    return ret

  def search(self, T, P):
    """
    KMP search main algorithm: String -> String -> [Int]
    Return all the matching position of pattern string P in T
    """
    partial, ret, j = self.partial(P), [], 0

    for i in range(len(T)):
      while j > 0 and T[i] != P[j]:
        j = partial[j - 1]
      if T[i] == P[j]: j += 1
      if j == len(P):
        ret.append(i - (j - 1))
        j = partial[j - 1]

    return ret


kmp = KMP()
data = scrap()


def search(msg: str) -> list:
  """
  {
    'title': [str],
    'text': [str],
    'code': [str]
    'category: [str]
  }
  """

  ranking = []

  def _norm_string(text):
    return text.replace(' ', '').lower()

  for each in data:
    keys = ['title', 'text', 'category', 'code', 'href']

    rank = defaultdict()
    for key in keys:
      value = each[key]
      if key == 'category' or key == 'href':
        rank[key] = value
        continue

      cnt = kmp.search(_norm_string(value), _norm_string(msg))
      rank[key] = value, len(cnt)

    ranking.append(rank)

  ranking = sorted(ranking, key=lambda x: x['code'][1], reverse=True)
  ranking = sorted(ranking, key=lambda x: x['text'][1], reverse=True)
  ranking = sorted(ranking, key=lambda x: x['title'][1], reverse=True)

  ret = []
  for each in ranking:
    if each['code'][1] == 0 and each['text'][1] == 0 and each['title'][1] == 0:
      continue
    ret.append(each)

  return ret


if __name__ == '__main__':

  data = scrap()
  print(data)
  T = 'parameter q is set to "miserable+failure"        parameter start is set to 10'
  P = 'param'
  kmp = KMP()
  from time import time
  start = time()
  for _ in range(100000):
    print(kmp.search(T, P))
  end = time()
  print(end - start)
  pprint(search('parameter'))
