import {api} from '../../../api'
import reqwest from '../../../utils/reqwest'

class MemberService {
  getMemberList(page = 1, limit = 50, ordering = 'date_joined', search = '') {
    return reqwest({
      url: api('member/member'),
      type: 'json',
      data: {
        page,
        limit,
        ordering,
        search
      }
    })
  }

  getSemMemberList(semester = 1, limit = 50, page = 1) {
    return reqwest(({
      url: api('member/all'),
      type: 'json',
      data: {
        semester,
        page,
        limit
      }
    }))
  }

  getMember(memberId) {
    return reqwest({
      url: api('member/member/' + memberId),
      type: 'json'
    })
  }

  registerMember(name, email, lifetime) {
    return reqwest({
      url: api('member/member'),
      method: 'post',
      data: {
        name,
        email,
        lifetime
      },
      type: 'json'
    })
  }

  searchMember(name) {
    return reqwest({
      url: api('member/member'),
      data: {
        limit: 10,
        search: name
      },
      type: 'json'
    })
  }

  updateMember(id, name, email, lifetime, honorary, comments) {
    return reqwest({
      url: api(`member/member/${id}`),
      data: {
        name,
        email,
        lifetime,
        honorary,
        comments,
      },

      type: 'json',
      method: 'patch'
    })
  }

  removeMember(id) {
    return reqwest({
      url: api(`member/member/${id}`),
      method: 'delete',
      type: 'json'
    })
  }

  getStats() {
    return reqwest({
      url: api('member/stats'),
      method: 'get',
      type: 'json',
    })
  }

  getSemesterStats(id) {
    return reqwest({
      url: api(`member/stats/${id}`),
      method: 'get',
      type: 'json'
    })
  }
}


export default new MemberService()
