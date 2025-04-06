import api from '@/apis/api';
import { Term } from '@/types/terms';

export const getTerms = () => {
  return api.get('/terms').then((r) => r.data);
};

export const createTerm = (term: Term) => {
  return api.post('/terms', term).then((r) => r.data);
};

export const updateTerm = (term: Term) => {
  return api.put(`/terms/${term.path}`, term).then((r) => r.data);
};

export const getTerm = (path: Term['path']) => {
  return api.get(`/terms/${path}`).then((r) => r.data);
};
