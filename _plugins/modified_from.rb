# Sets last_modified_at to the most recent git commit date across a page’s own
# file and optionally any files or directories listed in its modified_from front
# matter.

require 'time'

module ModifiedFrom
  def self.latest_commit_date(item)
    site  = item.site
    own   = item.respond_to?(:relative_path) ? item.relative_path : item.path
    specs = [own]

    Array(item.data['modified_from']).each do |path|
      if File.exist?(File.join(site.source, path))
        specs << path
      else
        Jekyll.logger.warn 'modified_from:', "path not found: #{path} (in #{own})"
      end
    end

    out = IO.popen(
      ['git', '-C', site.source, 'log', '-1', '--format=%cI', '--', *specs.uniq],
      err: File::NULL, &:read
    ).to_s.strip

    out.empty? ? nil : Time.parse(out)
  end
end

Jekyll::Hooks.register [:pages, :documents], :pre_render, priority: :low do |item, _payload|
  latest = ModifiedFrom.latest_commit_date(item)
  item.data['last_modified_at'] = latest if latest
end
